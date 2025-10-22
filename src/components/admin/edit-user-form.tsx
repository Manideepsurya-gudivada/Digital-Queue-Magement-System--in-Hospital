'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { users } from '@/lib/data';
import type { User, UserRole } from '@/lib/data';

interface EditUserFormProps {
  user: User;
  onUserUpdated: (updatedUser: User) => void;
}

export function EditUserForm({ user, onUserUpdated }: EditUserFormProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [role, setRole] = useState<UserRole>(user.role);
  
  const { toast } = useToast();
  
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setRole(user.role);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !role) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all required fields.',
      });
      return;
    }

    const updatedUser: User = {
      ...user,
      name,
      email,
      phone,
      role,
    };
    
    // In a real app, you'd save this to Firestore.
    // For now, we update the mock data.
    const userIndex = users.findIndex(u => u.id === user.id);
    if(userIndex !== -1) {
        users[userIndex] = updatedUser;
    }

    onUserUpdated(updatedUser);

    toast({
      title: 'User Updated',
      description: `${name}'s details have been successfully updated.`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="user-name">Full Name</Label>
        <Input id="user-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="user-email">Email</Label>
        <Input id="user-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="user-phone">Phone Number</Label>
        <Input id="user-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
       <div className="space-y-2">
          <Label htmlFor="user-role">Role</Label>
          <Select value={role} onValueChange={(value) => setRole(value as UserRole)} required>
            <SelectTrigger id="user-role">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="DOCTOR">Doctor</SelectItem>
              <SelectItem value="PATIENT">Patient</SelectItem>
              <SelectItem value="RECEPTIONIST">Receptionist</SelectItem>
            </SelectContent>
          </Select>
        </div>
      <Button type="submit" className="w-full mt-4">Save Changes</Button>
    </form>
  );
}
