const { Pool } = require("pg");

function getDatabaseConfig() {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : undefined,
    };
  }

  return {
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT || "5432", 10),
    database: process.env.DB_NAME || "walktrack",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : undefined,
  };
}

const pool = new Pool(getDatabaseConfig());

async function query(text, params) {
  return pool.query(text, params);
}

async function close() {
  return pool.end();
}

module.exports = {
  pool,
  query,
  close,
};
