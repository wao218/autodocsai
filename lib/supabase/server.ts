import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabase() {
  const store = await cookies() 
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
cookies: {
        getAll() {
          return store.getAll()
        },
        // no setAll in Server Components (reads only)
      },
    }
  )
}
