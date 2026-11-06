import 'dotenv/config'
import { createApp } from './app.js'

const PORT = process.env.PORT || 4000
const app = createApp()

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[FORESTER] API berjalan di http://0.0.0.0:${PORT}`)
  console.log(`[FORESTER] Health: http://0.0.0.0:${PORT}/api/health`)
})
