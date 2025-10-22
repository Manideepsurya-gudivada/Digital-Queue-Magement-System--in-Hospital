'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientQueueTable } from "@/components/doctor/patient-queue-table";
import { useUser } from "@/firebase";
import { users, queues as initialQueues } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';
import { Users, CheckCircle, Clock } from 'lucide-react';
import type { QueueItem } from '@/lib/data';


export default function DoctorDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  // For demo purposes, we'll use the first doctor.
  const doctorUser = users.find(u => u.email === user?.email) || users.find(u => u.role === 'DOCTOR');
  const doctorId = "doc-1"; // Hardcoded for demo

  const [queues, setQueues] = useState<QueueItem[]>(initialQueues.filter(q => q.doctorId === doctorId));

  const stats = [
    {
      title: 'Patients in Queue',
      value: queues.filter(q => q.status === 'WAITING').length,
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
      description: 'Currently waiting'
    },
    {
      title: 'Patients Seen Today',
      value: queues.filter(q => q.status === 'COMPLETED').length,
      icon: <CheckCircle className="h-6 w-6 text-muted-foreground" />,
      description: 'Completed consultations'
    },
    {
      title: 'Avg. Consult Time',
      value: '0 min',
      icon: <Clock className="h-6 w-6 text-muted-foreground" />,
      description: 'Based on today\'s visits'
    }
  ];

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user || !doctorUser) {
    return (
      <div className="p-8">
        <Skeleton className="h-16 w-1/2 mb-8" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  return (
    <DashboardLayout user={doctorUser} pageTitle="Doctor's Dashboard">
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
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Dr. Evelyn Reed's Queue</CardTitle>
                <CardDescription>
                  {queues.filter(q => q.status === 'WAITING').length} patient(s) waiting.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PatientQueueTable doctorId={doctorId} queues={queues} setQueues={setQueues}/>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
