'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { users, caseStudies as allCaseStudies } from "@/lib/data";
import { CaseStudySearch } from "@/components/case-studies/search";
import { StudyCard } from "@/components/case-studies/study-card";
import { Separator } from "@/components/ui/separator";
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function CaseStudiesPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const doctorUser = users.find(u => u.role === 'DOCTOR');

  if (isUserLoading || !user || !doctorUser) {
    return (
      <div className="p-8">
        <Skeleton className="h-16 w-1/2 mb-8" />
        <Skeleton className="h-12 w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={doctorUser} pageTitle="Case Study Library">
      <div className="space-y-8">
        <CaseStudySearch />
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCaseStudies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
