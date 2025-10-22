'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCards } from "@/components/admin/stats-cards";
import { PatientFlowChart } from "@/components/admin/patient-flow-chart";
import { DoctorManagementTable } from "@/components/admin/doctor-management-table";
import { useUser } from "@/firebase";
import { users } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';
import { DepartmentPerformance } from '@/components/admin/department-performance';
import { RecentActivity } from '@/components/admin/recent-activity';

export default function AdminDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const adminUser = users.find(u => u.role === 'ADMIN');

  if (isUserLoading || !user || !adminUser) {
    return (
      <div className="p-8">
        <Skeleton className="h-16 w-1/2 mb-8" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={adminUser} pageTitle="Admin Analytics">
      <div className="flex flex-col gap-8">
        <StatsCards />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PatientFlowChart />
          </div>
          <div className="space-y-8">
            <DepartmentPerformance />
            <RecentActivity />
          </div>
        </div>
        <DoctorManagementTable />
      </div>
    </DashboardLayout>
  );
}
