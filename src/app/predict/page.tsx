'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PredictionTool } from "@/components/predict/prediction-tool";
import { users } from "@/lib/data";
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function PredictPage() {
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
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Skeleton className="h-[500px]" />
          <Skeleton className="h-[300px]" />
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={adminUser} pageTitle="AI Prediction Tool">
      <PredictionTool />
    </DashboardLayout>
  );
}
