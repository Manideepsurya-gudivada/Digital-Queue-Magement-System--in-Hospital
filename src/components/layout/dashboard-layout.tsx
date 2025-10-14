import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Header } from '@/components/layout/header';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { Settings, LogOut } from 'lucide-react';
import type { User, UserRole } from '@/lib/data';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
  pageTitle: string;
}

export function DashboardLayout({ children, user, pageTitle }: DashboardLayoutProps) {
  const initials = user.name.split(' ').map(n => n[0]).join('');

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="items-center justify-center p-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-headline font-semibold text-lg text-primary">
            <Logo className="w-8 h-8" />
            <span className="group-data-[collapsible=icon]:hidden">MediQueue Pro</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav role={user.role} />
        </SidebarContent>
        <SidebarFooter className="p-4">
           <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogOut size={16} />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </Button>
          </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header user={user} pageTitle={pageTitle} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
