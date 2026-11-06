import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function Home() {
  const [apiStatus, setApiStatus] = useState('memeriksa...')
  const [apiOk, setApiOk] = useState(false)
  const [supabaseState, setSupabaseState] = useState('memeriksa...')

  useEffect(() => {
    let cancelled = false

    fetch(`${API_URL}/api/health`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        setApiStatus(`online • ${new Date(data.time).toLocaleTimeString()}`)
        setApiOk(true)
      })
      .catch(() => {
        if (cancelled) return
        setApiStatus('offline')
        setApiOk(false)
      })

    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY
    setSupabaseState(url && key ? 'terkonfigurasi' : 'belum diisi')

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1>FORESTER</h1>
        <p className="subtitle">music streaming • origin-inspired</p>
      </header>

      <section className="status-card">
        <div className="status-row">
          <span>Backend API</span>
          <strong className={apiOk ? 'ok' : 'warn'}>{apiStatus}</strong>
        </div>
        <div className="status-row">
          <span>Supabase</span>
          <strong className={supabaseState === 'terkonfigurasi' ? 'ok' : 'warn'}>
            {supabaseState}
          </strong>
        </div>
      </section>

      <footer className="app-footer">
        <p>Tahap 1 selesai. Selanjutnya: skema database + auth.</p>
      </footer>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
