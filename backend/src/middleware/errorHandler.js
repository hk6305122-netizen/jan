function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);

  const status = typeof err.status === "number" ? err.status : 500;
  const message = status >= 500 ? "Internal server error" : err.message;

  res.status(status).json({ error: message });
}

module.exports = { errorHandler };
