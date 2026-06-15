import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MissingDatabaseEnvironmentError, checkDatabaseConnection, getPool } from "./lib/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "dandorak_official",
  });
});

app.get("/api/db-health", async (_req, res) => {
  try {
    await checkDatabaseConnection();
    res.json({ ok: true });
  } catch (error) {
    if (error instanceof MissingDatabaseEnvironmentError) {
      res.status(500).json({
        ok: false,
        message: "DB environment variables are missing",
      });
      return;
    }

    console.error("DB connection failed", error.message);
    res.status(500).json({
      ok: false,
      message: "DB connection failed",
    });
  }
});

const parsePrice = (value, fallback) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(100000, Math.max(9000, Math.round(parsed)));
};

const parseCategoryIds = (value) => {
  const rawValues = Array.isArray(value) ? value : String(value || "").split(",");
  const ids = rawValues
    .map((rawValue) => Number(rawValue))
    .filter((id) => Number.isInteger(id) && id >= 1 && id <= 9);

  return [...new Set(ids)];
};

const shouldExposeDatabaseError = () => process.env.MENU_API_DEBUG === "true" || process.env.NODE_ENV !== "production";

const buildDatabaseErrorPayload = (message, error) => ({
  ok: false,
  message,
  ...(shouldExposeDatabaseError()
    ? {
        error: {
          code: error.code,
          errno: error.errno,
          sqlState: error.sqlState,
          sqlMessage: error.sqlMessage || error.message,
        },
      }
    : {}),
});

app.get("/api/menu", async (req, res) => {
  const selectedCategoryIds = parseCategoryIds(req.query.categories);
  const minPrice = parsePrice(req.query.minPrice, 9000);
  const maxPrice = parsePrice(req.query.maxPrice, 50000);
  const normalizedMinPrice = Math.min(minPrice, maxPrice);
  const normalizedMaxPrice = Math.max(minPrice, maxPrice);
  const requestedSort = ["category", "price_desc", "price_asc"].includes(req.query.sort) ? req.query.sort : "category";
  const itemPriceSortDirection = requestedSort === "price_desc" ? "DESC" : "ASC";
  const categoryPriceSortDirection = requestedSort === "price_desc" ? "DESC" : "ASC";
  const orderClause = requestedSort === "category"
    ? `CASE
         WHEN ip.category_id = 7 THEN 0
         WHEN ip.category_id = 9 THEN 2
         ELSE 1
       END,
       category_price.category_min_price ASC,
       ip.category_id,
       item_price ASC,
       ip.seq,
       i.id`
    : `category_price.category_min_price ${categoryPriceSortDirection},
       ip.category_id,
       item_price ${itemPriceSortDirection},
       ip.seq,
       i.id`;

  const params = [normalizedMinPrice, normalizedMaxPrice];
  const categoryCondition = selectedCategoryIds.length
    ? `AND ip.category_id IN (${selectedCategoryIds.map(() => "?").join(", ")})`
    : "";
  params.push(...selectedCategoryIds);

  try {
    const [categories] = await getPool().query(
      `SELECT
         c.id,
         c.name,
         MIN(CAST(REPLACE(i.price, ',', '') AS UNSIGNED)) AS min_price,
         MAX(CAST(REPLACE(i.price, ',', '') AS UNSIGNED)) AS max_price
       FROM dandorak_category c
       LEFT JOIN dandorak_item_position ip
         ON ip.category_id = c.id
       LEFT JOIN dandorak_item i
         ON i.id = ip.item_id
       WHERE c.id BETWEEN 1 AND 9
       GROUP BY c.id, c.name
       ORDER BY c.id`,
    );

    const [items] = await getPool().query(
      `SELECT
         ip.category_id,
         c.name AS category_name,
         i.name AS short_name,
         i.long_name,
         i.main_dish,
         i.price,
         CAST(REPLACE(i.price, ',', '') AS UNSIGNED) AS item_price,
         category_price.category_min_price
       FROM dandorak_item_position ip
       JOIN dandorak_category c
         ON c.id = ip.category_id
       JOIN dandorak_item i
         ON i.id = ip.item_id
       JOIN (
         SELECT
           ip_inner.category_id,
           MIN(CAST(REPLACE(i_inner.price, ',', '') AS UNSIGNED)) AS category_min_price
         FROM dandorak_item_position ip_inner
         JOIN dandorak_item i_inner
           ON i_inner.id = ip_inner.item_id
         WHERE ip_inner.category_id BETWEEN 1 AND 9
         GROUP BY ip_inner.category_id
       ) category_price
         ON category_price.category_id = ip.category_id
       WHERE ip.category_id BETWEEN 1 AND 9
         AND CAST(REPLACE(i.price, ',', '') AS UNSIGNED) BETWEEN ? AND ?
         ${categoryCondition}
       ORDER BY
         ${orderClause}`,
      params,
    );

    res.json({
      ok: true,
      filters: {
        categories: selectedCategoryIds,
        minPrice: normalizedMinPrice,
        maxPrice: normalizedMaxPrice,
        sort: requestedSort,
      },
      categories,
      items,
    });
  } catch (error) {
    if (error instanceof MissingDatabaseEnvironmentError) {
      res.status(500).json({ ok: false, message: "DB environment variables are missing" });
      return;
    }

    console.error("Menu query failed", {
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage,
      message: error.message,
    });
    res.status(500).json(buildDatabaseErrorPayload("Menu query failed", error));
  }
});

app.get("/menu", (_req, res) => {
  res.sendFile(path.join(publicDir, "menu.html"));
});

app.get(/^\/(?!api(?:\/|$)).*/, (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(port, () => {
  console.log(`dandorak_official server listening on port ${port}`);
});
