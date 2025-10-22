import React from 'react';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { Settings, LogOut } from 'lucide-react';
import type { User, UserRole } from '@/lib/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { signOut, Auth } from 'firebase/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
  pageTitle: string;
}

export function DashboardLayout({ children, user, pageTitle }: DashboardLayoutProps) {
  const auth = useAuth() as Auth;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 flex-shrink-0 bg-primary text-primary-foreground flex flex-col">
        <div className="h-20 flex items-center justify-center p-4">
          <Link href="/admin" className="flex items-center gap-3">
             <div className="bg-white p-2 rounded-lg">
                <Logo className="w-8 h-8 text-primary" />
             </div>
            <span className="font-bold text-xl">HealthCare</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarNav role={user.role} />
        </div>
        <div className="p-4 border-t border-primary-foreground/20">
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-2 hover:bg-white/10">
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
      
      <div className="flex-1 flex flex-col">
        <header className="h-20 flex items-center px-8 border-b">
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
        </header>
        <main className="flex-1 p-8 bg-background">
          {children}
        </main>
        <footer className="bg-primary text-primary-foreground text-center p-4 text-sm">
          © 2025 Hospital Management System. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}
