import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerSupabase() {
  const store = cookies() 
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Read-only pattern for Server Components
        getAll() {
          return store.getAll().map(c => ({ name: c.name, value: c.value }))
        },
        setAll() {
         
        },
      },
    }
  )
}
