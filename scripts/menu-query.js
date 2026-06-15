import "dotenv/config";
import { MissingDatabaseEnvironmentError, getPool } from "../lib/db.js";

const query = `SELECT
  ip.category_id,
  c.name AS category_name,
  i.name AS short_name,
  i.long_name,
  i.main_dish,
  i.price
FROM dandorak_item_position ip
JOIN dandorak_category c
  ON c.id = ip.category_id
JOIN dandorak_item i
  ON i.id = ip.item_id
WHERE ip.category_id BETWEEN 1 AND 9
  AND CAST(REPLACE(i.price, ',', '') AS UNSIGNED) BETWEEN ? AND ?
ORDER BY
  ip.category_id,
  ip.seq,
  i.id
LIMIT 20`;

try {
  const [rows] = await getPool().query(query, [9000, 50000]);
  console.log(JSON.stringify({ ok: true, count: rows.length, sample: rows }, null, 2));
  process.exit(0);
} catch (error) {
  if (error instanceof MissingDatabaseEnvironmentError) {
    console.error(JSON.stringify({ ok: false, message: "DB environment variables are missing" }, null, 2));
  } else {
    console.error(JSON.stringify({
      ok: false,
      message: "Menu query failed",
      error: {
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage || error.message,
      },
    }, null, 2));
  }

  process.exit(1);
}
