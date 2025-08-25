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

export default function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className='flex items-center mt-2 ml-2'>
          <Image
            src='https://avatar.iran.liara.run/public'
            alt=''
            width={40}
            height={40}
            className='rounded-full aspect-square object-cover'
          />
          <p className='text-base font-semibold ml-2'>Wesley Osborne</p>
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
          <LogOutIcon />
          <p>Logout</p>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
