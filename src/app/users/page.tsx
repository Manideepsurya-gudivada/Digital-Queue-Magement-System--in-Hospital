'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useUser } from "@/firebase";
import { users } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function UsersPage() {
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
      <DashboardLayout user={users.find(u => u.role === 'ADMIN')!} pageTitle="Users">
        <div className="p-8">
          <Skeleton className="h-16 w-1/2 mb-8" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </DashboardLayout>
    );
  }

  const getRoleBadge = (role: string) => {
      switch(role) {
          case 'ADMIN': return <Badge variant="destructive">Admin</Badge>;
          case 'DOCTOR': return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Doctor</Badge>;
          case 'PATIENT': return <Badge variant="secondary" className="bg-green-100 text-green-800">Patient</Badge>;
          case 'RECEPTIONIST': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Receptionist</Badge>;
          default: return <Badge variant="outline">{role}</Badge>
      }
  }

  return (
    <DashboardLayout user={adminUser} pageTitle="User Management">
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={u.avatar.imageUrl} alt={u.name} />
                        <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.phone}</TableCell>
                  <TableCell>{getRoleBadge(u.role)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
