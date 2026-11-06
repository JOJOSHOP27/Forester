import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  // eslint-disable-next-line no-console
  console.warn(
    '[FORESTER] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum diisi di backend/.env'
  )
}

export const supabaseAdmin = createClient(url || '', serviceKey || '', {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})
