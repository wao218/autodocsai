import AppSideBar from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className='flex h-screen'>
        <AppSideBar />
        <main className='flex-1 overflow-y-auto'>{children}</main>
      </div>
    </SidebarProvider>
  );
}
