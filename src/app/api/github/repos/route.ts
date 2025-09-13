import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase/server"

type GitHubRepo = {
  id: number
  name: string
  full_name: string
  private: boolean
  html_url: string
  description: string | null
}

export async function GET(req: Request) {
  const supabase = await createServerSupabase()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const token = session?.provider_token
    if (!token) {
    
    await supabase.auth.signOut()
    return NextResponse.json(
      { error: "signed_out", reason: "missing_provider_token" },
      { status: 401 }
    )
  }
  const { searchParams } = new URL(req.url)
  const query = (searchParams.get("q") || "").toLowerCase()

  const res = await fetch("https://api.github.com/user/repos?per_page=100&sort=updated", {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  })

    if (res.status === 401 || res.status === 403) {
    await supabase.auth.signOut()
    return NextResponse.json(
      { error: "signed_out", reason: "github_token_invalid_or_expired" },
      { status: 401 }
    )
  }

  if (!res.ok) {
    const msg = await res.text()
    return NextResponse.json({ error: msg || "GitHub fetch failed" }, { status: res.status })
  }

  const repos = (await res.json()) as GitHubRepo[]
  const simplified = repos.map(repo => ({
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    private: repo.private,
    html_url: repo.html_url,
    description: repo.description,
  }))

  const filtered = query ? simplified.filter(repo => (repo.name + " " + (repo.description || "")).toLowerCase().includes(query)) : simplified
  return NextResponse.json({ repos: filtered })
}
