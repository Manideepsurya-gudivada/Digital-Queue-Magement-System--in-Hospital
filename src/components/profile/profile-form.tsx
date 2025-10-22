'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User as UserData } from "@/lib/data";
import { Separator } from "../ui/separator";
import { KeyRound, Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser } from '@/firebase';
import { Auth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import type { User } from 'firebase/auth';


interface ProfileFormProps {
    user: UserData;
}

export function ProfileForm({ user: profileUser }: ProfileFormProps) {
  const initials = profileUser.name.split(' ').map(n => n[0]).join('');
  const { user } = useUser();
  const auth = useAuth() as Auth;
  const { toast } = useToast();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast({ variant: 'destructive', title: 'Not authenticated', description: 'You must be logged in to change your password.' });
        return;
    }
    if (newPassword !== confirmPassword) {
        toast({ variant: 'destructive', title: 'Passwords do not match', description: 'Please re-enter your new password.'});
        return;
    }
    if (newPassword.length < 6) {
        toast({ variant: 'destructive', title: 'Password too weak', description: 'Your new password must be at least 6 characters long.'});
        return;
    }

    setIsUpdating(true);

    try {
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
        
        await updatePassword(user, newPassword);

        toast({ title: 'Password Updated', description: 'Your password has been successfully changed.'});
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

    } catch(error: any) {
        console.error("Password Update Error: ", error);
        let description = 'An unexpected error occurred.';
        if (error.code === 'auth/wrong-password') {
            description = 'The current password you entered is incorrect. Please try again.';
        }
        toast({ variant: 'destructive', title: 'Update Failed', description });
    } finally {
        setIsUpdating(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profileUser.avatar.imageUrl} alt={profileUser.name} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
              <CardTitle className="font-headline text-2xl">My Profile</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={profileUser.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={profileUser.email} disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue={profileUser.phone} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue={profileUser.role} disabled />
          </div>
           <Button className="mt-4">Save Changes</Button>
        </form>

        <Separator />

        <div>
            <div className="flex items-center gap-2 mb-4">
                <KeyRound className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Change Password</h3>
            </div>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                    </div>
                </div>
                <Button type="submit" variant="secondary" disabled={isUpdating}>
                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isUpdating ? 'Updating...' : 'Update Password'}
                </Button>
            </form>
        </div>
      </CardContent>
    </Card>
  );
}
