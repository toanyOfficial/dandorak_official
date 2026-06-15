import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MissingDatabaseEnvironmentError, checkDatabaseConnection } from "./lib/db.js";

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

app.get(/^\/(?!api(?:\/|$)).*/, (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(port, () => {
  console.log(`dandorak_official server listening on port ${port}`);
});
