const { dbPool } = require('../lib/db');

async function checkDbHealth() {
  try {
    await dbPool.query('SELECT 1');
    console.log(JSON.stringify({ ok: true }));
    await dbPool.end();
  } catch (error) {
    console.log(JSON.stringify({ ok: false, message: 'DB connection failed' }));
    await dbPool.end().catch(() => {});
    process.exitCode = 1;
  }
}

checkDbHealth();
