require('dotenv').config();

const path = require('node:path');
const express = require('express');
const { createDbPool } = require('./lib/db');

const app = express();
const PORT = process.env.PORT || 3700;
const publicDir = path.join(__dirname, 'public');

app.use(express.json());
app.use(express.static('public'));

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'dandorak_official',
  });
});

app.get('/api/db-health', async (req, res) => {
  let dbPool;

  try {
    dbPool = createDbPool();
    await dbPool.query('SELECT 1');
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'DB connection failed',
    });
  } finally {
    if (dbPool) {
      await dbPool.end().catch(() => {});
    }
  }
});

app.get(/^\/api\//, (req, res) => {
  res.status(404).json({
    ok: false,
    message: 'Not found',
  });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`dandorak_official server listening on port ${PORT}`);
});
