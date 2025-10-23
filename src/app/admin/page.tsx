'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useUser } from "@/firebase";
import { users, queues, doctors, UserRole } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users as UsersIcon, CalendarCheck, Stethoscope } from 'lucide-react';
import { WeeklyAppointmentsChart } from '@/components/admin/weekly-appointments-chart';
import { QueueOverview } from '@/components/admin/queue-overview';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

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

  const userRoles = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<UserRole, number>);

  const appointmentStatus = queues.reduce((acc, queue) => {
    acc[queue.status] = (acc[queue.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    {
      title: 'Total Users',
      value: users.length.toString(),
      icon: <UsersIcon className="h-8 w-8 text-purple-600" />,
      popoverContent: (
        <div>
          <h4 className="font-medium text-sm mb-2">Users by Role</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            {Object.entries(userRoles).map(([role, count]) => (
              <li key={role} className="flex justify-between">
                <span>{role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}</span>
                <Badge variant="secondary">{count}</Badge>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: 'Appointments',
      value: queues.length.toString(),
      icon: <CalendarCheck className="h-8 w-8 text-green-500" />,
      popoverContent: (
         <div>
          <h4 className="font-medium text-sm mb-2">Appointments by Status</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            {Object.entries(appointmentStatus).map(([status, count]) => (
              <li key={status} className="flex justify-between">
                <span>{status}</span>
                <Badge variant="secondary">{count}</Badge>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: 'Doctors',
      value: doctors.length.toString(),
      icon: <Stethoscope className="h-8 w-8 text-yellow-500" />,
      popoverContent: (
        <div>
          <h4 className="font-medium text-sm mb-2">Active Doctors</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            {doctors.map(doc => (
                <li key={doc.id}>{doc.name} - <span className="text-xs">{doc.specialization}</span></li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout user={adminUser} pageTitle="Dashboard">
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => (
                <Popover key={stat.title}>
                  <PopoverTrigger asChild>
                    <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        {stat.icon}
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                      </CardContent>
                    </Card>
                  </PopoverTrigger>
                  <PopoverContent>
                    {stat.popoverContent}
                  </PopoverContent>
                </Popover>
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
