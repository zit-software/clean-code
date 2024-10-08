/**
 * Error handler middleware
 * @type {import('express').ErrorRequestHandler}
 */
export default function errorHandler(error, req, res, next) {
  res.render('error', {error});
  next();
}
