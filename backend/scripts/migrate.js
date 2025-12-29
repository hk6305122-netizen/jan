const path = require("path");
const { spawnSync } = require("child_process");

const { loadEnv } = require("../src/loadEnv");

loadEnv();

function ensureDatabaseUrl() {
  if (process.env.DATABASE_URL) return;

  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || "5432";
  const db = process.env.DB_NAME || "walktrack";
  const user = process.env.DB_USER || "postgres";
  const password = process.env.DB_PASSWORD || "postgres";

  process.env.DATABASE_URL = `postgres://${encodeURIComponent(user)}:${encodeURIComponent(
    password,
  )}@${host}:${port}/${db}`;
}

ensureDatabaseUrl();

const direction = process.argv[2];
if (!direction || !["up", "down"].includes(direction)) {
  // eslint-disable-next-line no-console
  console.error("Usage: node backend/scripts/migrate.js <up|down>");
  process.exit(1);
}

const migrationsDir = path.join(__dirname, "..", "..", "database", "migrations");
const bin = path.join(__dirname, "..", "node_modules", ".bin", "node-pg-migrate");

const result = spawnSync(
  bin,
  [direction, "-m", migrationsDir, "--database-url", process.env.DATABASE_URL],
  {
    stdio: "inherit",
    env: process.env,
  },
);

process.exit(result.status ?? 1);
