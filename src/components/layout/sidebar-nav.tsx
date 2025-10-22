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
  Settings,
  BookUser,
  BrainCircuit
} from "lucide-react";
import type { UserRole } from "@/lib/data";

interface SidebarNavProps {
  role: UserRole;
}

const allNavItems = {
  ADMIN: [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/appointments", label: "Appointments", icon: CalendarCheck },
    { href: "/users", label: "Users", icon: Users },
    { href: "/doctors", label: "Doctors", icon: Stethoscope },
    { href: "/departments", label: "Departments", icon: Building },
    { href: "/predict", label: "AI Predictor", icon: BrainCircuit },
  ],
  DOCTOR: [
    { href: "/doctor", label: "Patient Queue", icon: Users },
    { href: "/case-studies", label: "Case Studies", icon: FileText },
    { href: "/profile", label: "Profile", icon: Settings },
  ],
  PATIENT: [
    { href: "/dashboard", label: "My Dashboard", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: Settings },
  ],
  RECEPTIONIST: [
      { href: "/receptionist", label: "Registration", icon: BookUser },
  ]
};

const roleTitles = {
    ADMIN: "Admin Panel",
    DOCTOR: "Doctor Menu",
    PATIENT: "Patient Menu",
    RECEPTIONIST: "Reception Menu"
}

export function SidebarNav({ role }: SidebarNavProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navItems = allNavItems[role] || [];
  const title = roleTitles[role] || "Menu";
  
  return (
    <nav className="flex flex-col p-4 space-y-2">
      <p className="px-3 text-sm font-semibold text-white/50">{title}</p>
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
