'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { QueueStatus } from "@/components/dashboard/queue-status";
import { Notifications } from "@/components/dashboard/notifications";
import { useUser } from "@/firebase";
import { users } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function PatientDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);
  
  // For demo purposes, find the user from the mock data.
  // In a real app, this data would come from Firestore.
  const patientUser = users.find(u => u.email === user?.email) || users.find(u => u.role === 'PATIENT');

  if (isUserLoading || !user || !patientUser) {
    return (
      <div className="p-8">
        <Skeleton className="h-16 w-1/2 mb-8" />
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/2 flex-grow">
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="w-full lg:w-1/2 flex-grow">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={patientUser} pageTitle="My Dashboard">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-1/2 flex-grow">
          <QueueStatus />
        </div>
        <div className="w-full lg:w-1/2 flex-grow">
          <Notifications />
        </div>
      </div>
    </DashboardLayout>
  );
}
