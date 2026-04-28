import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Ensure the variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing from environment variables.')
}

// Client for public operations (respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client for admin operations (bypasses RLS)
// ONLY use this in Server Actions protected by authentication
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey)
