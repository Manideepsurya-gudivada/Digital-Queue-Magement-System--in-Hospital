'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useUser } from "@/firebase";
import { users } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users as UsersIcon, CalendarCheck, Stethoscope } from 'lucide-react';
import { WeeklyAppointmentsChart } from '@/components/admin/weekly-appointments-chart';
import { QueueOverview } from '@/components/admin/queue-overview';

const stats = [
  {
    title: 'Total Users',
    value: '0',
    icon: <UsersIcon className="h-8 w-8 text-purple-600" />,
  },
  {
    title: 'Appointments',
    value: '0',
    icon: <CalendarCheck className="h-8 w-8 text-green-500" />,
  },
  {
    title: 'Doctors',
    value: '0',
    icon: <Stethoscope className="h-8 w-8 text-yellow-500" />,
  },
];

export default function AdminDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    } else {
      const currentUser = users.find(u => u.email === user?.email);
      if (currentUser?.role !== 'ADMIN') {
        // Or redirect to their specific dashboard
        // For now, redirecting to login
        router.push('/');
      }
    }
  }, [user, isUserLoading, router]);

  const adminUser = users.find(u => u.role === 'ADMIN');

  if (isUserLoading || !user || !adminUser) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-screen w-full" />
      </div>
    );
  }

  return (
    <DashboardLayout user={adminUser} pageTitle="Dashboard">
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <WeeklyAppointmentsChart />
                </div>
                <div className="lg:col-span-2">
                    <QueueOverview />
                </div>
            </div>
        </div>
    </DashboardLayout>
  );
}
