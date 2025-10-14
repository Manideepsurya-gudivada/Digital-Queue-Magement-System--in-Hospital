'use client';

import React, { useState } from "react";
import { MoreHorizontal, Play, CheckCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { queues as initialQueues, getPatientById } from "@/lib/data";
import type { QueueItem } from "@/lib/data";
import { AddCaseStudySheet } from "./add-case-study-sheet";

interface PatientQueueTableProps {
  doctorId: string;
}

export function PatientQueueTable({ doctorId }: PatientQueueTableProps) {
  const [queues, setQueues] = useState<QueueItem[]>(
    initialQueues.filter(q => q.doctorId === doctorId)
  );
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const handleStatusChange = (queueId: string, status: 'IN_PROGRESS' | 'COMPLETED') => {
    setQueues(prevQueues =>
      prevQueues.map(q => (q.id === queueId ? { ...q, status } : q))
    );
  };
  
  const handleAddCaseStudy = (patientId: string) => {
    setSelectedPatientId(patientId);
    setSheetOpen(true);
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
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Wait Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queues
            .sort((a,b) => a.tokenNumber - b.tokenNumber)
            .map((item) => {
            const patient = getPatientById(item.patientId);
            return (
              <TableRow key={item.id} className={item.status === 'IN_PROGRESS' ? 'bg-blue-50' : ''}>
                <TableCell className="font-medium">#{item.tokenNumber}</TableCell>
                <TableCell>{patient?.name || "Unknown"}</TableCell>
                <TableCell>{item.status === 'WAITING' ? `${item.estimatedWaitTime} min` : '-'}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {item.status === "WAITING" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'IN_PROGRESS')}>
                          Start Consultation
                        </DropdownMenuItem>
                      )}
                      {item.status === "IN_PROGRESS" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(item.id, 'COMPLETED')}>
                          Mark as Completed
                        </DropdownMenuItem>
                      )}
                      {item.status === "COMPLETED" && (
                         <DropdownMenuItem onClick={() => handleAddCaseStudy(item.patientId)}>
                           Add Case Study
                         </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <AddCaseStudySheet 
        isOpen={isSheetOpen} 
        setIsOpen={setSheetOpen} 
        patientId={selectedPatientId}
        doctorId={doctorId}
      />
    </>
  );
}
