'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ProfileForm } from "@/components/profile/profile-form";
import { useUser } from "@/firebase";
import { users } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  // We'll show the profile for a sample patient user
  const profileUser = users.find(u => u.email === user?.email) || users[0];

  if (isUserLoading || !user || !profileUser) {
     return (
        <div className="p-8">
          <Skeleton className="h-16 w-1/2 mb-8" />
          <Skeleton className="h-[400px] w-full max-w-2xl mx-auto" />
        </div>
     )
  }

  return (
    <DashboardLayout user={profileUser} pageTitle="Profile Settings">
      <ProfileForm user={profileUser} />
    </DashboardLayout>
  );
}
