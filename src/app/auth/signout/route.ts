import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

// same helper style you used for /auth/callback
async function createServerSupabaseForRoute() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => {
          cookieStore.set({ name, value, ...options })
        },
        remove: (name, options) => {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 })
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
