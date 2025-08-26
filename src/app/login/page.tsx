'use client'
import { supabase } from '../../../lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
    <div className="min-h-svh flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome to Auto Docs AI!</CardTitle>
          <CardDescription>Sign in to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full" onClick={signInWithGitHub}>
            Login with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}