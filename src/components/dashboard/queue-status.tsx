'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { queues } from '@/lib/data';

export function QueueStatus() {
  const patientQueueItem = queues.find(q => q.patientId === 'pat-2'); // Demo for Jane Smith
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  if (!patientQueueItem) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center h-full">
        <h2 className="text-xl font-semibold text-muted-foreground">You are not in a queue.</h2>
        <p className="text-muted-foreground">Please register at the front desk to get a token.</p>
      </Card>
    );
  }

  const waitingPatients = queues.filter(q => q.doctorId === patientQueueItem.doctorId && q.status === 'WAITING');
  const yourPosition = waitingPatients.findIndex(p => p.id === patientQueueItem.id) + 1;

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardContent className="p-8 text-center">
        <p className="text-lg font-medium text-muted-foreground">Your Token Number</p>
        <h2 className="text-7xl font-bold font-headline text-primary tracking-tighter">
          #{patientQueueItem.tokenNumber}
        </h2>
        
        <Separator className="my-6" />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <p className="text-base text-muted-foreground">Position in Queue</p>
            <p className="text-4xl font-bold text-foreground animate-pulse">
              {yourPosition > 0 ? yourPosition : '-'}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base text-muted-foreground">Est. Wait Time</p>
            <p className="text-4xl font-bold text-foreground">
              {patientQueueItem.status === 'WAITING' ? `~${patientQueueItem.estimatedWaitTime}m` : 'Now'}
            </p>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
            Last updated: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </CardContent>
    </Card>
  );
}
