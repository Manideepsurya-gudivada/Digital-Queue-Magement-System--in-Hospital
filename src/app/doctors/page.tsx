'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useUser } from "@/firebase";
import { users, doctors } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function DoctorsPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    } else {
      const currentUser = users.find(u => u.email === user?.email);
      if (currentUser?.role !== 'ADMIN') {
        router.push('/');
      }
    }
  }, [user, isUserLoading, router]);

  const adminUser = users.find(u => u.role === 'ADMIN');

  if (isUserLoading || !user || !adminUser) {
    return (
      <DashboardLayout user={users.find(u => u.role === 'ADMIN')!} pageTitle="Doctors">
        <div className="p-8">
          <Skeleton className="h-16 w-1/2 mb-8" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={adminUser} pageTitle="Doctor Management">
      <Card>
        <CardHeader>
          <CardTitle>All Doctors</CardTitle>
          <CardDescription>A list of all doctors in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={doc.avatar.imageUrl} alt={doc.name} />
                        <AvatarFallback>{doc.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">{doc.specialization}</Badge>
                  </TableCell>
                  <TableCell>{doc.department}</TableCell>
                  <TableCell>
                      <div className="flex flex-col">
                          <span>{doc.email}</span>
                          <span className="text-muted-foreground">{doc.phone}</span>
                      </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
