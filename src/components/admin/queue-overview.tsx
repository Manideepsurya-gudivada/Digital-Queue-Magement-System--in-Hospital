'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { queues, getPatientById, getDoctorById } from "@/lib/data";
import type { QueueItem } from "@/lib/data";
import { Clock, Play, MoreHorizontal, CheckCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function QueueOverview() {
    const [liveQueues, setLiveQueues] = useState<QueueItem[]>(queues);

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
    
    const activeQueues = liveQueues.filter(q => q.status === 'WAITING' || q.status === 'IN_PROGRESS');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Live Queue Overview</CardTitle>
        <CardDescription>A real-time view of all active patient queues.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeQueues.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No active patients in the queue.
                    </TableCell>
                </TableRow>
            ) : (
                activeQueues.map((item) => {
                    const patient = getPatientById(item.patientId);
                    const doctor = getDoctorById(item.doctorId);
                    return (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">#{item.tokenNumber}</TableCell>
                            <TableCell>{patient?.name || 'Unknown'}</TableCell>
                            <TableCell>{doctor?.name || 'Unknown'}</TableCell>
                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                        </TableRow>
                    );
                })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
