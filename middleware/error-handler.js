const errorHandler = (err, req, res, next) => {
  console.log(err);
  let customError = {
    StatusCode: err.StatusCode || 500,
    msg: err.message || "Something went wrong",
  };
  res.status(customError.StatusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
