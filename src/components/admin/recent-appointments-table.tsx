'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const appointments = [
    // Data is empty as per the design
];

export function RecentAppointmentsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Recent Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No recent appointments
                    </TableCell>
                </TableRow>
            ) : (
                appointments.map((appt) => (
                    <TableRow key={appt.patient}>
                        <TableCell>{appt.patient}</TableCell>
                        <TableCell>{appt.doctor}</TableCell>
                        <TableCell>{appt.date}</TableCell>
                        <TableCell>{appt.status}</TableCell>
                    </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
