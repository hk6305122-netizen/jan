const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { loadEnv } = require("./loadEnv");
const { errorHandler } = require("./middleware/errorHandler");
const { notFound } = require("./middleware/notFound");
const { healthRouter } = require("./routes/health");

loadEnv();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use(healthRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = { app };
