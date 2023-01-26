const errorManager = (error, _req, res, _next) => {
  console.error(error);
  const status = error.status || 500;
  const messageErr = error.message || 'Something went wrong';
  res.status(status).json({ message: messageErr });
};

module.exports = errorManager;
