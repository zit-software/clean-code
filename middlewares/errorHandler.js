/**
 * Error handler middleware
 * @type {import('express').ErrorRequestHandler}
 */
export default function errorHandler(error, req, res, next) {
  res.status(500).render('error', {error});
  next();
}
