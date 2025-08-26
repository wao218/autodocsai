"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Repo = { id: number; name: string; full_name: string; private: boolean; html_url: string; description?: string }

export default function RepositoriesDialog() {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [repos, setRepos] = React.useState<Repo[]>([])
  const [query, setQuery] = React.useState("")
  const [selected, setSelected] = React.useState<Repo | null>(null)

  // fetch when opening
  React.useEffect(() => {
    if (!open) return
    setLoading(true)
    setError(null)
    fetch("/api/github/repos")
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json()).error || "Failed to load repos")
        return r.json()
      })
      .then((data) => setRepos(data.repos || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [open])

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return repos
    return repos.filter(r => (r.name + " " + (r.description || "")).toLowerCase().includes(q))
  }, [repos, query])

  const onGenerate = () => {
    if (!selected) return
    // TODO: wire to your creation flow
    // e.g. router.push(`/dashboard/new?repo=${encodeURIComponent(selected.full_name)}`)
    console.log("Generate for:", selected)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="hover:cursor-pointer">Create New Document</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Repositories</DialogTitle>
          <DialogDescription>Select a repository to generate documentation.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Search your repos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="rounded-md border bg-muted/30 max-h-72 overflow-y-auto divide-y">
            {loading && (
              <div className="px-3 py-4 text-sm text-muted-foreground">Loading repositories…</div>
            )}
            {error && (
              <div className="px-3 py-4 text-sm text-destructive">Error: {error}</div>
            )}
            {!loading && !error && filtered.length === 0 && (
              <div className="px-3 py-4 text-sm text-muted-foreground">No repositories found.</div>
            )}
            {filtered.map((repo) => (
              <button
                key={repo.id}
                type="button"
                onClick={() => setSelected(repo)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm hover:bg-accent",
                  selected?.id === repo.id && "bg-accent/70"
                )}
                title={repo.full_name}
              >
                <div className="font-medium">{repo.name}</div>
                {repo.description && (
                  <div className="text-muted-foreground">{repo.description}</div>
                )}
              </button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onGenerate} disabled={!selected}>
            Generate Doc
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
