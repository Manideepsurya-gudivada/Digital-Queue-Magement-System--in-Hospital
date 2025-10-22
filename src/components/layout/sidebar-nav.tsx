'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Stethoscope, 
  Building,
  HeartPulse, 
  FileText, 
  Settings 
} from "lucide-react";
import type { UserRole } from "@/lib/data";

interface SidebarNavProps {
  role: UserRole;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users", label: "Users", icon: Users },
  { href: "/appointments", label: "Appointments", icon: CalendarCheck },
  { href: "/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/departments", label: "Departments", icon: Building },
  { href: "/patients", label: "Patients", icon: HeartPulse },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function SidebarNav({ role }: SidebarNavProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  // For this redesign, we'll assume the admin sees all links.
  // We can add role-based filtering later if needed.
  if (role !== 'ADMIN') {
    // You can define different nav items for other roles here
    return null;
  }
  
  return (
    <nav className="flex flex-col p-4 space-y-2">
      <p className="px-3 text-sm font-semibold text-white/50">Admin Panel</p>
      {navItems.map(item => (
        <Link 
          key={item.label}
          href={item.href} 
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive(item.href) 
              ? "bg-white/20 text-white" 
              : "text-white/80 hover:bg-white/10 hover:text-white"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
