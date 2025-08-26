import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const supabase = await createServerSupabase()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const token = session?.provider_token
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") || "").toLowerCase()

  const res = await fetch("https://api.github.com/user/repos?per_page=100&sort=updated", {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    const msg = await res.text()
    return NextResponse.json({ error: msg || "GitHub fetch failed" }, { status: res.status })
  }

  const repos = (await res.json()) as any[]
  const simplified = repos.map(r => ({
    id: r.id,
    name: r.name,
    full_name: r.full_name,
    private: r.private,
    html_url: r.html_url,
    description: r.description,
  }))

  const filtered = q ? simplified.filter(r => (r.name + " " + (r.description || "")).toLowerCase().includes(q)) : simplified
  return NextResponse.json({ repos: filtered })
}
