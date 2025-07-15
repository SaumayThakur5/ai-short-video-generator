import React from 'react';
import Link from 'next/link';
import { useAuthContext } from '../../provider';
import { HomeIcon, FileVideo, Search } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import Image from 'next/image';
import { Button } from "@/components/ui/Button";

const MenuItems = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: HomeIcon
  },
  {
    title: 'Create New Video',
    url: '/create-new-video',
    icon: FileVideo
  },
  {
    title: 'Explore',
    url: '/', // 👈 Updated from '/explore' to '/'
    icon: Search
  },
];

function AppSidebar() {
  const { user } = useAuthContext();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className='flex items-center gap-3'>
          <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
          <h2>Video Gen</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <div className='mt-10'>
            <Link href={'/create-new-video'}>
              <Button className="w-full">Create New Video</Button>
            </Link>
          </div>

          <SidebarMenu>
            {MenuItems.map((menu, index) => (
              <SidebarMenuItem className="mt-3" key={index}>
                <SidebarMenuButton>
                  <Link href={menu.url} className="flex items-center gap-4 p-3">
                    <menu.icon />
                    <span>{menu.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* Reserved for future use */}
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
