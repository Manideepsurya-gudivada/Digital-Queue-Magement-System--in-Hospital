'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { doctors, patients, queues } from '@/lib/data';
import type { Patient, QueueItem, User } from '@/lib/data';
import { sendSmsNotification } from '@/ai/flows/send-sms-notification';

interface PatientRegistrationProps {
  onPatientRegistered: (newQueueItem: QueueItem | User) => void;
  formType?: 'card' | 'dialog';
}

export function PatientRegistration({ onPatientRegistered, formType = 'card' }: PatientRegistrationProps) {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientAge || !patientGender || !doctorId) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all fields to register a patient.',
      });
      return;
    }

    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) {
        toast({ variant: 'destructive', title: 'Invalid Doctor', description: 'Please select a valid doctor.' });
        return;
    }

    // In a real app, you'd save the new patient to Firestore.
    // For now, we'll create them in our mock data.
    const newPatient: Patient = {
      id: `pat-${uuidv4()}`,
      name: patientName,
      age: parseInt(patientAge, 10),
      gender: patientGender as 'Male' | 'Female' | 'Other',
      email: `${patientName.toLowerCase().replace(' ', '.')}@mediqueue.pro`,
      role: 'PATIENT',
      phone: patientPhone || 'N/A',
      medicalHistory: 'None',
      avatar: { id: 'avatar-1', imageUrl: 'https://picsum.photos/seed/avatar1/100/100', description: 'avatar', imageHint: 'person' },
    };
    patients.push(newPatient);

    const doctorQueues = queues.filter(q => q.doctorId === doctorId);
    const lastTokenNum = Math.max(0, ...doctorQueues.map(q => {
        const num = parseInt(q.tokenNumber.split('-')[1]);
        return isNaN(num) ? 0 : num;
    }));
    const newTokenNumber = `${doctor.department.charAt(0).toUpperCase()}-${String(lastTokenNum + 1).padStart(3, '0')}`;


    const newQueueItem: QueueItem = {
      id: `q-${uuidv4()}`,
      patientId: newPatient.id,
      doctorId: doctorId,
      tokenNumber: newTokenNumber,
      status: 'WAITING',
      estimatedWaitTime: doctorQueues.filter(q => q.status === 'WAITING').length * 15,
      createdAt: new Date().toISOString(),
    };
    queues.push(newQueueItem);
    onPatientRegistered(newQueueItem);

    toast({
      title: 'Patient Registered',
      description: `${patientName} has been assigned token #${newTokenNumber} for Dr. ${doctor.name}.`,
    });
    
    if (newPatient.phone && newPatient.phone !== 'N/A') {
        try {
            await sendSmsNotification({
                to: newPatient.phone,
                message: `Hi ${newPatient.name}, your appointment is confirmed. Your token is ${newTokenNumber} for Dr. ${doctor.name}.`
            });
            toast({
                title: "Confirmation SMS Sent",
                description: `Sent booking details to ${newPatient.name}.`,
            });
        } catch (error) {
            console.error("Failed to send booking SMS:", error);
            toast({
                variant: 'destructive',
                title: 'SMS Failed',
                description: 'Could not send confirmation SMS.'
            })
        }
    }


    // Reset form
    setPatientName('');
    setPatientAge('');
    setPatientGender('');
    setPatientPhone('');
    setDoctorId('');
  };

  const formContent = (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="patient-name">Patient Name</Label>
          <Input id="patient-name" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="e.g., John Doe" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patient-age">Age</Label>
            <Input id="patient-age" type="number" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} placeholder="e.g., 35" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="patient-gender">Gender</Label>
            <Select value={patientGender} onValueChange={setPatientGender}>
              <SelectTrigger id="patient-gender">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="patient-phone">Phone Number (For SMS Alerts)</Label>
            <Input id="patient-phone" type="tel" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} placeholder="e.g., 123-456-7890" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="doctor">Assign to Doctor</Label>
          <Select value={doctorId} onValueChange={setDoctorId}>
            <SelectTrigger id="doctor">
              <SelectValue placeholder="Select a doctor..." />
            </SelectTrigger>
            <SelectContent>
              {doctors.map(doc => (
                <SelectItem key={doc.id} value={doc.id}>{doc.name} - {doc.specialization}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );

  if (formType === 'dialog') {
    return (
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        {formContent}
        <Button type="submit" className="w-full mt-4">Register and Generate Token</Button>
      </form>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>New Patient Registration</CardTitle>
          <CardDescription>Register a new patient and add them to a queue.</CardDescription>
        </CardHeader>
        <CardContent>
          {formContent}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Register and Generate Token</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
