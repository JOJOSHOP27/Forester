import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { notFound, errorHandler } from './middlewares/errorHandler.js'

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
  app.use(express.json({ limit: '1mb' }))
  app.use(morgan('dev'))

  // ── Health check (dipakai frontend Tahap 1) ──
  app.get('/api/health', (req, res) => {
    res.json({
      ok: true,
      service: 'forester-api',
      time: new Date().toISOString(),
    })
  })

  // ── Route lain akan didaftarkan di Tahap 2+ ──
  // import authRoutes from './routes/auth.routes.js'
  // app.use('/api/auth', authRoutes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}
