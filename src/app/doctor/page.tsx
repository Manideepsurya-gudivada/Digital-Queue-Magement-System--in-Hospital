'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientQueueTable } from "@/components/doctor/patient-queue-table";
import { useUser } from "@/firebase";
import { users, queues as initialQueues, getPatientById } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';
import { Users, CheckCircle, Clock } from 'lucide-react';
import type { QueueItem } from '@/lib/data';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDistanceToNow } from 'date-fns';

export default function DoctorDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  // For demo purposes, we'll use the first doctor.
  const doctorUser = users.find(u => u.email === user?.email) || users.find(u => u.role === 'DOCTOR');
  const doctorId = "doc-1"; // Hardcoded for demo

  const [queues, setQueues] = useState<QueueItem[]>(initialQueues.filter(q => q.doctorId === doctorId));
  
  const waitingPatients = queues.filter(q => q.status === 'WAITING');
  const completedPatients = queues.filter(q => q.status === 'COMPLETED');

  const stats = [
    {
      title: 'Patients in Queue',
      value: waitingPatients.length,
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
      description: 'Currently waiting',
      popoverContent: (
          <div>
              <h4 className="font-medium text-sm mb-2">Waiting Patients</h4>
              {waitingPatients.length > 0 ? (
                <ul className="text-sm text-muted-foreground space-y-2">
                    {waitingPatients.map(q => {
                        const patient = getPatientById(q.patientId);
                        return <li key={q.id}>{patient?.name || 'Unknown'} - Token #{q.tokenNumber}</li>
                    })}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No patients are currently waiting.</p>
              )}
          </div>
      )
    },
    {
      title: 'Patients Seen Today',
      value: completedPatients.length,
      icon: <CheckCircle className="h-6 w-6 text-muted-foreground" />,
      description: 'Completed consultations',
       popoverContent: (
          <div>
              <h4 className="font-medium text-sm mb-2">Completed Today</h4>
              {completedPatients.length > 0 ? (
                <ul className="text-sm text-muted-foreground space-y-2">
                    {completedPatients.map(q => {
                        const patient = getPatientById(q.patientId);
                        return <li key={q.id}>{patient?.name || 'Unknown'} - Seen {formatDistanceToNow(new Date(q.createdAt), {addSuffix: true})}</li>
                    })}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No consultations completed yet.</p>
              )}
          </div>
      )
    },
    {
      title: 'Avg. Consult Time',
      value: '0 min',
      icon: <Clock className="h-6 w-6 text-muted-foreground" />,
      description: 'Based on today\'s visits',
      popoverContent: (
        <div>
            <h4 className="font-medium text-sm mb-2">Calculation</h4>
            <p className="text-sm text-muted-foreground">This metric is calculated based on the time from when a consultation starts to when it is marked as complete. Currently a placeholder.</p>
        </div>
      )
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
             <Popover key={stat.title}>
              <PopoverTrigger asChild>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              </PopoverTrigger>
              <PopoverContent>
                {stat.popoverContent}
              </PopoverContent>
            </Popover>
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
