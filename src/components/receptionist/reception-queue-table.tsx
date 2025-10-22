'use client';

import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, Play } from "lucide-react";
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
import { getPatientById, getDoctorById } from "@/lib/data";
import type { QueueItem } from "@/lib/data";

interface ReceptionQueueTableProps {
  initialQueues: QueueItem[];
}

export function ReceptionQueueTable({ initialQueues }: ReceptionQueueTableProps) {
  const [queues, setQueues] = useState<QueueItem[]>(initialQueues);

  useEffect(() => {
    setQueues(initialQueues);
  }, [initialQueues]);

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
    <Card>
        <CardHeader>
            <CardTitle>Today's Queue</CardTitle>
            <CardDescription>A live view of all patient queues.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Assigned Doctor</TableHead>
                    <TableHead>Est. Wait Time</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {[...queues]
                    .sort((a,b) => a.tokenNumber - b.tokenNumber)
                    .map((item) => {
                    const patient = getPatientById(item.patientId);
                    const doctor = getDoctorById(item.doctorId);
                    return (
                    <TableRow key={item.id} className={item.status === 'IN_PROGRESS' ? 'bg-blue-50' : ''}>
                        <TableCell className="font-medium">#{item.tokenNumber}</TableCell>
                        <TableCell>{patient?.name || "Unknown"}</TableCell>
                        <TableCell>{doctor?.name || "Unknown"}</TableCell>
                        <TableCell>{item.status === 'WAITING' ? `${item.estimatedWaitTime} min` : '-'}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
