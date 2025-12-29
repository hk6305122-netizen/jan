const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

function loadEnv() {
  const candidates = [
    path.join(process.cwd(), ".env"),
    path.join(process.cwd(), "config", ".env"),
    path.join(__dirname, "..", ".env"),
    path.join(__dirname, "..", "..", "config", ".env"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      dotenv.config({ path: candidate });
      return candidate;
    }
  }

  dotenv.config();
  return null;
}

module.exports = { loadEnv };
