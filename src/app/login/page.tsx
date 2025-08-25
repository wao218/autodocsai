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
}