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
import { getPatientById } from "@/lib/data";
import type { QueueItem } from "@/lib/data";
import { AddCaseStudySheet } from "./add-case-study-sheet";
import { useToast } from "@/hooks/use-toast";
import { sendSmsNotification } from "@/ai/flows/send-sms-notification";
import { formatDistanceToNow } from 'date-fns';

interface PatientQueueTableProps {
  doctorId: string;
  queues: QueueItem[];
  setQueues: React.Dispatch<React.SetStateAction<QueueItem[]>>;
}

export function PatientQueueTable({ doctorId, queues, setQueues }: PatientQueueTableProps) {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStatusChange = async (queueId: string, status: 'IN_PROGRESS' | 'COMPLETED') => {
    const queueItem = queues.find(q => q.id === queueId);
    if (!queueItem) return;

    setQueues(prevQueues =>
      prevQueues.map(q => (q.id === queueId ? { ...q, status } : q))
    );

    const patientDetails = getPatientById(queueItem.patientId);

    if (status === 'IN_PROGRESS' && patientDetails && patientDetails.phone !== 'N/A') {
        try {
            await sendSmsNotification({
                to: patientDetails.phone,
                message: `Hi ${patientDetails.name}, your consultation with the doctor is starting now.`
            });
            toast({
                title: "SMS Sent to Current Patient",
                description: `Notified ${patientDetails.name} that their consultation is starting.`,
            });
        } catch (error) {
            console.error("Failed to send SMS to current patient:", error);
        }
        
      const sortedQueues = [...queues].sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      const currentIndex = sortedQueues.findIndex(q => q.id === queueId);
      const nextPatientInQueue = sortedQueues.find((q, index) => index > currentIndex && q.status === 'WAITING');

      if (nextPatientInQueue) {
        const nextPatientDetails = getPatientById(nextPatientInQueue.patientId);
        if (nextPatientDetails && nextPatientDetails.phone !== 'N/A') {
          try {
            await sendSmsNotification({
              to: nextPatientDetails.phone,
              message: `Hi ${nextPatientDetails.name}, you are next in the queue to see the doctor. Please be ready.`
            });
            toast({
              title: "SMS Sent to Next Patient",
              description: `Notified ${nextPatientDetails.name} that they are next in line.`,
            });
          } catch (error) {
            console.error("Failed to send SMS:", error);
            toast({
              variant: "destructive",
              title: "SMS Failed",
              description: "Could not send notification to the next patient.",
            });
          }
        }
      }
    }
  };

  const handleCallNext = () => {
    const waitingPatients = queues
      .filter(q => q.status === 'WAITING')
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    if(waitingPatients.length > 0) {
        handleStatusChange(waitingPatients[0].id, 'IN_PROGRESS');
    } else {
        toast({
            title: "No patients waiting",
            description: "There are no patients currently in the queue.",
        });
    }
  };
  
  const handleAddCaseStudy = (patientId: string) => {
    setSelectedPatientId(patientId);
    setSheetOpen(true);
  };

  const getStatusBadge = (status: QueueItem['status']) => {
    switch (status) {
      case "WAITING":
        return <Badge variant="secondary">Waiting</Badge>;
      case "IN_PROGRESS":
        return <Badge variant="default">In Progress</Badge>;
      case "COMPLETED":
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleCallNext}>Call Next</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket #</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Waiting Since</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queues
            .sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .map((item) => {
            const patient = getPatientById(item.patientId);
            return (
              <TableRow key={item.id} className={item.status === 'IN_PROGRESS' ? 'bg-blue-50 dark:bg-blue-900/50' : ''}>
                <TableCell className="font-medium">{item.tokenNumber}</TableCell>
                <TableCell>{patient?.name || "Unknown"}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</TableCell>
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
