'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { BarChart3, Bot, FileText, LayoutDashboard, Stethoscope, Users, UserPlus } from "lucide-react";
import type { UserRole } from "@/lib/data";

interface SidebarNavProps {
  role: UserRole;
}

export function SidebarNav({ role }: SidebarNavProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const patientNav = (
    <SidebarMenuItem>
      <Link href="/dashboard">
        <SidebarMenuButton isActive={isActive('/dashboard')} tooltip="Dashboard">
          <LayoutDashboard />
          <span>Queue Status</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );

  const doctorNav = (
    <>
      <SidebarMenuItem>
        <Link href="/doctor">
          <SidebarMenuButton isActive={isActive('/doctor')} tooltip="Patient Queue">
            <Users />
            <span>Patient Queue</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <Link href="/case-studies">
          <SidebarMenuButton isActive={isActive('/case-studies')} tooltip="Case Studies">
            <FileText />
            <span>Case Studies</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </>
  );
  
  const receptionistNav = (
     <SidebarMenuItem>
        <Link href="/receptionist">
          <SidebarMenuButton isActive={isActive('/receptionist')} tooltip="Patient Registration">
            <UserPlus />
            <span>Registration</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
  );

  const adminNav = (
    <>
       <SidebarMenuItem>
        <Link href="/receptionist">
          <SidebarMenuButton isActive={isActive('/receptionist')} tooltip="Patient Registration">
            <UserPlus />
            <span>Registration</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <Link href="/admin">
          <SidebarMenuButton isActive={isActive('/admin')} tooltip="Analytics">
            <BarChart3 />
            <span>Analytics</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <Link href="/doctor">
          <SidebarMenuButton isActive={isActive('/doctor')} tooltip="Live Queues">
            <Users />
            <span>Live Queues</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <Link href="/case-studies">
          <SidebarMenuButton isActive={isActive('/case-studies')} tooltip="Case Studies">
            <FileText />
            <span>Case Studies</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </>
  );

  const navLinks = () => {
    switch (role) {
      case 'PATIENT':
        return patientNav;
      case 'DOCTOR':
        return doctorNav;
       case 'RECEPTIONIST':
        return receptionistNav;
      case 'ADMIN':
        return adminNav;
      default:
        return null;
    }
  };

  return (
    <SidebarMenu>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        {navLinks()}
      </SidebarGroup>
      
      {(role === 'ADMIN' || role === 'DOCTOR') && (
        <SidebarGroup>
          <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
          <SidebarMenuItem>
            <Link href="/predict">
              <SidebarMenuButton isActive={isActive('/predict')} tooltip="Wait Time Predictor">
                <Bot />
                <span>Wait Time Predictor</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarGroup>
      )}
    </SidebarMenu>
  );
}
