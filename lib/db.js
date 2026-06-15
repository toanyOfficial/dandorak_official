const fs = require('node:fs');
const path = require('node:path');

const REQUIRED_ENV_KEYS = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const DEFAULT_DB_PORT = 3306;

function loadDotEnv(envPath = path.resolve(process.cwd(), '.env')) {
  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (!key || Object.prototype.hasOwnProperty.call(process.env, key)) {
      continue;
    }

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function validateDbEnv(env = process.env) {
  const missingKeys = REQUIRED_ENV_KEYS.filter((key) => !env[key]);

  if (missingKeys.length > 0) {
    throw new Error(`Missing required DB environment variables: ${missingKeys.join(', ')}`);
  }
}

function getDbConfig(env = process.env) {
  validateDbEnv(env);

  return {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: Number(env.DB_PORT || DEFAULT_DB_PORT),
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
}

function createDbPool() {
  loadDotEnv();
  const dbConfig = getDbConfig();

  // Install dependencies with `npm install` before running DB health checks.
  // eslint-disable-next-line global-require
  const mysql = require('mysql2/promise');

  return mysql.createPool(dbConfig);
}

function getDbPool() {
  return createDbPool();
}

const exportsObject = {
  createDbPool,
  getDbConfig,
  getDbPool,
  loadDotEnv,
  validateDbEnv,
};

Object.defineProperty(exportsObject, 'dbPool', {
  enumerable: true,
  get: getDbPool,
});

module.exports = exportsObject;
