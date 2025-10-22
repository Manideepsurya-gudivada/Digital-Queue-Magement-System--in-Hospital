'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal, Play, CheckCircle, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/firebase";
import { users, queues, getPatientById, getDoctorById, QueueItem } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

export default function AppointmentsPage() {
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
      <div className="p-8">
        <Skeleton className="h-16 w-1/2 mb-8" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  const getStatusBadge = (status: QueueItem['status']) => {
    switch (status) {
      case "WAITING":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="mr-1 h-3 w-3" />Waiting</Badge>;
      case "IN_PROGRESS":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Play className="mr-1 h-3 w-3" />In Progress</Badge>;
      case "COMPLETED":
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout user={adminUser} pageTitle="All Appointments">
      <Card>
        <CardHeader>
          <CardTitle>Appointment Records</CardTitle>
          <CardDescription>
            A complete log of all patient appointments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queues
                .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((item) => {
                const patient = getPatientById(item.patientId);
                const doctor = getDoctorById(item.doctorId);
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">#{item.tokenNumber}</TableCell>
                    <TableCell>{patient?.name || "Unknown"}</TableCell>
                    <TableCell>{doctor?.name || "Unknown"}</TableCell>
                    <TableCell>{format(new Date(item.createdAt), "PPP p")}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
