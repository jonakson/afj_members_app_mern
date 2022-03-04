const errorHandler = (err, req, res, next) => {
  // If it isn't an error on Response (client) it's an error on Server
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  //next();
};

module.exports = {
  errorHandler,
};
