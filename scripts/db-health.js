const { createDbPool } = require('../lib/db');

async function checkDbHealth() {
  let dbPool;

  try {
    dbPool = createDbPool();
    await dbPool.query('SELECT 1');
    console.log(JSON.stringify({ ok: true }));
  } catch (error) {
    console.log(JSON.stringify({ ok: false, message: 'DB connection failed' }));
    process.exitCode = 1;
  } finally {
    if (dbPool) {
      await dbPool.end().catch(() => {});
    }
  }
}

checkDbHealth();
