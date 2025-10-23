'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { queues, getDoctorById, doctors } from "@/lib/data";
import { format } from "date-fns";
import { Button } from "../ui/button";

interface PreviousRecordsProps {
    patientId: string;
}

export function PreviousRecords({ patientId }: PreviousRecordsProps) {
    const previousAppointments = queues
        .filter(q => q.patientId === patientId && q.status === 'COMPLETED')
        .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const getDepartmentForDoctor = (doctorId: string) => {
        const doctor = doctors.find(d => d.id === doctorId);
        return doctor?.department || "N/A";
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Previous Appointment Records</CardTitle>
                <CardDescription>A history of your past consultations.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {previousAppointments.length > 0 ? (
                            previousAppointments.map(item => {
                                const doctor = getDoctorById(item.doctorId);
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>{format(new Date(item.createdAt), 'PPP')}</TableCell>
                                        <TableCell>{doctor?.name || 'Unknown'}</TableCell>
                                        <TableCell>{getDepartmentForDoctor(item.doctorId)}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">View Details</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                    You have no completed appointments on record.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
