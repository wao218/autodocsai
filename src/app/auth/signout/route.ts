import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

// same helper style used for /auth/callback
async function createServerSupabaseForRoute() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
   cookies: {
        // NEW API
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set({ name, value, ...options })
          })
        },
      },
    }
  )
}

export async function GET(request: Request) {
  const supabase = await createServerSupabaseForRoute()
  // clears the auth cookies on the server
  await supabase.auth.signOut()

  const url = new URL(request.url)
  return NextResponse.redirect(new URL("/login", url))
}
