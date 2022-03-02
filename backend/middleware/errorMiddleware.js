const errorHandler = (err, req, res, next) => {
  res.json({
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
