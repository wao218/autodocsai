// app/dashboard/layout.tsx
import AppSideBar from "@/components/layout/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import { createServerSupabase } from "@/lib/supabase/server"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSideBar />
        <main className="flex-1 overflow-y-auto">
          <div className="sticky top-0 z-10 flex h-12 items-center gap-2 border-b bg-background px-3">
            <SidebarTrigger />
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Toggle sidebar (Ctrl/⌘ + B)
            </span>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
