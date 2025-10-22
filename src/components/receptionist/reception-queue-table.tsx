'use client';

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPatientById, getDoctorById, doctors } from "@/lib/data";
import type { QueueItem } from "@/lib/data";
import { formatDistanceToNow } from 'date-fns';

interface ReceptionQueueTableProps {
  initialQueues: QueueItem[];
}

export function ReceptionQueueTable({ initialQueues }: ReceptionQueueTableProps) {
  const [queues, setQueues] = useState<QueueItem[]>(initialQueues);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setQueues(initialQueues);
  }, [initialQueues]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getDepartmentForDoctor = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor?.department || "N/A";
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Queue Overview</CardTitle>
            <CardDescription>Live view of all patient tickets.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Ticket #</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Wait Time</TableHead>
                    <TableHead>Est. Wait</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {[...queues]
                    .filter(q => q.status === 'WAITING')
                    .sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                    .map((item) => {
                    const patient = getPatientById(item.patientId);
                    return (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.tokenNumber}</TableCell>
                        <TableCell>{patient?.name || "Unknown"}</TableCell>
                        <TableCell>{getDepartmentForDoctor(item.doctorId)}</TableCell>
                        <TableCell><Badge variant="secondary" className="bg-gray-700 text-white hover:bg-gray-600">Waiting</Badge></TableCell>
                        <TableCell>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</TableCell>
                        <TableCell>N/A</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
