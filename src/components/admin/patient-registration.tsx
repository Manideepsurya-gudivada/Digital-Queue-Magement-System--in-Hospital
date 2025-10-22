'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { users, patients } from '@/lib/data';
import type { Patient, User } from '@/lib/data';

interface PatientRegistrationProps {
  onPatientRegistered: (newPatient: User) => void;
}

export function PatientRegistration({ onPatientRegistered }: PatientRegistrationProps) {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientAge || !patientGender || !patientEmail) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all required fields.',
      });
      return;
    }

    const newPatient: Patient = {
      id: `pat-${uuidv4()}`,
      name: patientName,
      age: parseInt(patientAge, 10),
      gender: patientGender as 'Male' | 'Female' | 'Other',
      email: patientEmail,
      role: 'PATIENT',
      phone: patientPhone || 'N/A',
      medicalHistory: 'None',
      avatar: { id: `avatar-${Math.floor(Math.random() * 5) + 1}`, imageUrl: `https://picsum.photos/seed/avatar${Math.floor(Math.random() * 5) + 1}/100/100`, description: 'avatar', imageHint: 'person' },
    };
    
    // In a real app, you'd save this to Firestore.
    // For now, we update the mock data.
    patients.push(newPatient);
    users.push(newPatient);

    onPatientRegistered(newPatient);

    toast({
      title: 'Patient Registered',
      description: `${patientName} has been successfully added to the system.`,
    });

    // Reset form
    setPatientName('');
    setPatientAge('');
    setPatientGender('');
    setPatientEmail('');
    setPatientPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="patient-name">Patient Name</Label>
        <Input id="patient-name" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="e.g., John Doe" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="patient-age">Age</Label>
          <Input id="patient-age" type="number" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} placeholder="e.g., 35" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patient-gender">Gender</Label>
          <Select value={patientGender} onValueChange={setPatientGender} required>
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
        <Label htmlFor="patient-email">Email</Label>
        <Input id="patient-email" type="email" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} placeholder="e.g., john.doe@example.com" required />
      </div>
       <div className="space-y-2">
        <Label htmlFor="patient-phone">Phone Number (Optional)</Label>
        <Input id="patient-phone" type="tel" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} placeholder="e.g., 123-456-7890" />
      </div>
      <Button type="submit" className="w-full mt-4">Register Patient</Button>
    </form>
  );
}
