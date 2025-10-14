'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { getPatientById } from '@/lib/data';
import { useEffect, useState } from 'react';

interface AddCaseStudySheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  patientId: string | null;
  doctorId: string;
}

export function AddCaseStudySheet({ isOpen, setIsOpen, patientId, doctorId }: AddCaseStudySheetProps) {
    const [patientName, setPatientName] = useState('');

    useEffect(() => {
        if (patientId) {
            const patient = getPatientById(patientId);
            setPatientName(patient?.name || 'Unknown Patient');
        }
    }, [patientId]);
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here you would handle form submission, e.g., calling an API
        console.log("Submitting case study for patient:", patientId);
        setIsOpen(false);
    };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Add New Case Study</SheetTitle>
            <SheetDescription>
              Document a new medical case. Patient: <span className='font-semibold'>{patientName}</span>
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="e.g., Atypical Presentation of..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category / Specialization</Label>
              <Input id="category" placeholder="e.g., Cardiology" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Detailed analysis of the case..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Upload Image/File</Label>
              <Input id="image" type="file" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="anonymized" defaultChecked />
              <label
                htmlFor="anonymized"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Anonymize patient data
              </label>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit">Save Case Study</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
