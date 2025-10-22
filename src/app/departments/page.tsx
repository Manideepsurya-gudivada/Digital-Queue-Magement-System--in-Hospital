'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useUser } from "@/firebase";
import { users, departmentMetrics } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Users as UsersIcon, Clock } from 'lucide-react';

export default function DepartmentsPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    } else {
      const currentUser = users.find(u => u.email === user?.email);
      if (currentUser?.role !== 'ADMIN') {
        router.push('/');
      }
    }
  }, [user, isUserLoading, router]);

  const adminUser = users.find(u => u.role === 'ADMIN');

  if (isUserLoading || !user || !adminUser) {
    return (
      <DashboardLayout user={users.find(u => u.role === 'ADMIN')!} pageTitle="Departments">
        <div className="p-8">
          <Skeleton className="h-16 w-1/2 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={adminUser} pageTitle="Department Analytics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departmentMetrics.map(dept => (
                <Card key={dept.id}>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>{dept.name}</span>
                            <BarChart className="h-6 w-6 text-muted-foreground" />
                        </CardTitle>
                        <CardDescription>Live statistics for the department.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <UsersIcon className="h-4 w-4" />
                                <span>Patient Load</span>
                            </div>
                            <span className="font-bold">{dept.patientLoad}</span>
                        </div>
                        <Progress value={(dept.patientLoad / 100) * 100} />
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4" />
                                <span>Avg. Wait Time</span>
                            </div>
                            <span className="font-bold">{dept.avgWaitTime} min</span>
                        </div>

                         <div className="text-sm text-muted-foreground pt-2">
                           <span className="font-semibold">{dept.doctorCount}</span> Doctors assigned
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </DashboardLayout>
  );
}
