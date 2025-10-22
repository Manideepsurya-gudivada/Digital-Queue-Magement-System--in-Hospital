'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, CheckCircle, Clock, PlusCircle } from "lucide-react";
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
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useUser } from "@/firebase";
import { users, queues as initialQueues, getPatientById, getDoctorById, QueueItem } from "@/lib/data";
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { PatientRegistration } from '@/components/shared/patient-registration';

export default function AppointmentsPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [queues, setQueues] = useState<QueueItem[]>(initialQueues);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      <DashboardLayout user={users.find(u => u.role === 'ADMIN')!} pageTitle="All Appointments">
        <div className="p-8">
          <Skeleton className="h-16 w-1/2 mb-8" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </DashboardLayout>
    );
  }
  
  const handlePatientRegistered = (newQueueItem: QueueItem) => {
    // We only need to update the state. The mock data is already updated in the form component.
    setQueues(prevQueues => [...prevQueues.filter(q => q.id !== newQueueItem.id), newQueueItem]);
    setIsDialogOpen(false);
  };

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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Appointment Records</CardTitle>
            <CardDescription>
              A complete log of all patient appointments.
            </CardDescription>
          </div>
           <Button onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Appointment
          </Button>
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
              {[...queues]
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
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Register New Patient Appointment</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new patient to a doctor's queue.
            </DialogDescription>
          </DialogHeader>
          <PatientRegistration onPatientRegistered={handlePatientRegistered} formType='dialog' />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
