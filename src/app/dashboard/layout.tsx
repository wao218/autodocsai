import AppSideBar from '@/components/layout/app-sidebar';
import { SidebarProvider,SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className='flex h-screen w-screen'>
        <AppSideBar />
        <main className='flex-1 overflow-y-auto'>{children}
            <div className="sticky top-0 z-10 flex h-12 items-center gap-2 border-b bg-background px-3">
            <SidebarTrigger />
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Toggle sidebar (Ctrl/⌘ + B)
            </span>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
