'use client'
import { supabase } from '../../../lib/supabase/client'

export default function LoginPage() {
  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        // IMPORTANT: go to the callback, not /dashboard
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }
return (
  <div className="flex min-h-screen items-center justify-center ">
    <div className="w-full max-w-sm flex flex-col justify- items-center rounded-2xl border border-gray-300  p-6 shadow-md gap-10">
      
      {/* Top (Login) */}
      <h1 className="text-2xl font-semibold">Login with Github</h1>

      {/* Bottom (Button) */}
      <button 
        onClick={signInWithGitHub} 
        className="mt-30 w-full rounded-md border border-gray-500 bg-gray-500 px-4 py-2 hover:bg-gray-100 transition"
      >
        Sign in with GitHub
      </button>

    </div>
  </div>
)
}
