'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PatientQueueTable } from "@/components/doctor/patient-queue-table";
import { useUser } from "@/firebase";
import { users } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';


export default function DoctorDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  // For demo purposes, we'll use the first doctor.
  const doctorUser = users.find(u => u.email === user?.email) || users.find(u => u.role === 'DOCTOR');
  const doctorId = "doc-1"; // Hardcoded for demo

  if (isUserLoading || !user || !doctorUser) {
    return (
      <div className="p-8">
        <Skeleton className="h-16 w-1/2 mb-8" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  return (
    <DashboardLayout user={doctorUser} pageTitle="Patient Queue">
      <Card>
        <CardHeader>
          <CardTitle>Today's Patient Queue</CardTitle>
          <CardDescription>
            Manage your patient consultations for the day.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PatientQueueTable doctorId={doctorId} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
