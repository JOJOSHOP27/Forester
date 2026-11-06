export function notFound(req, res) {
  res.status(404).json({ ok: false, error: 'Route not found' })
}

// Express butuh 4 argumen agar dikenali sebagai error handler
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error('[FORESTER ERROR]', err)
  const status = err.status || 500
  res.status(status).json({
    ok: false,
    error: err.message || 'Internal Server Error',
  })
}
