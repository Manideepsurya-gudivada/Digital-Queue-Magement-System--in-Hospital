'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useUser } from "@/firebase";
import { users, queues as initialQueues } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { PatientRegistration } from '@/components/shared/patient-registration';
import { ReceptionQueueTable } from '@/components/receptionist/reception-queue-table';
import { QueueItem } from '@/lib/data';

export default function ReceptionistDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [queues, setQueues] = useState<QueueItem[]>(initialQueues);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const receptionistUser = users.find(u => u.email === user?.email) || users.find(u => u.role === 'RECEPTIONIST');

  if (isUserLoading || !user || !receptionistUser) {
    return (
      <div className="p-8">
        <Skeleton className="h-16 w-1/2 mb-8" />
        <div className="grid gap-8 lg:grid-cols-3">
            <Skeleton className="h-96 lg:col-span-1" />
            <Skeleton className="h-96 lg:col-span-2" />
        </div>
      </div>
    );
  }

  const handlePatientRegistered = (newQueueItem: QueueItem) => {
    // We only need to update the state. The mock data is already updated in the form component.
    setQueues(prevQueues => [...prevQueues.filter(q => q.id !== newQueueItem.id), newQueueItem]);
  };

  return (
    <DashboardLayout user={receptionistUser} pageTitle="Patient Registration & Queue">
      <div className="grid gap-8 lg:grid-cols-3 items-start">
        <div className="lg:col-span-1 space-y-8">
          <PatientRegistration onPatientRegistered={handlePatientRegistered} />
        </div>
        <div className="lg:col-span-2">
          <ReceptionQueueTable initialQueues={queues} />
        </div>
      </div>
    </DashboardLayout>
  );
}
