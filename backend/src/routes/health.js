const express = require("express");

const { query } = require("../db");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.get("/health/db", async (req, res, next) => {
  try {
    await query("SELECT 1 as ok");
    res.json({ status: "ok" });
  } catch (err) {
    err.status = 503;
    next(err);
  }
});

module.exports = { healthRouter: router };
