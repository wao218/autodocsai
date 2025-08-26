
import { createServerSupabase } from "@/lib/supabase/server"
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { FileTextIcon, LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function AppSideBar() {
    const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  const m: any = user?.user_metadata ?? {}
  const displayName = m.user_name ?? m.full_name ?? m.name ?? "User"
  const avatarSrc =
    m.avatar_url ?? "https://avatars.githubusercontent.com/u/0?v=4"
  return (
    <Sidebar>
      <SidebarHeader>
        <div className='flex items-center mt-2 ml-2'>
          <Image
            src={avatarSrc}
            alt={displayName}
            width={40}
            height={40}
            className='rounded-full aspect-square object-cover'
          />
          <p className='text-base font-semibold ml-2'>{displayName}</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className='mt-4'>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/dashboard'>
                    <FileTextIcon />
                    <p className='text-base'>Documents</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant={'ghost'} className='flex items-center justify-start'>
          <Link href='/auth/signout'>
          <LogOutIcon />
          <p>Logout</p>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
