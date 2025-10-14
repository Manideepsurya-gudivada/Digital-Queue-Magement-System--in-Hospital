'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Auth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import type { UserRole } from '@/lib/data';

interface SignupFormProps {
  role: UserRole;
}

export function SignupForm({ role }: SignupFormProps) {
  const router = useRouter();
  const auth = useAuth() as Auth;
  const { user, isUserLoading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && user) {
      if (role === 'DOCTOR') {
        router.push('/doctor');
      } else if (role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, isUserLoading, router, role]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, you would also collect other user details (like name)
      // and create a user document in Firestore based on the role.
      await createUserWithEmailAndPassword(auth, email, password);
      // The redirect will be handled by the useEffect hook
    } catch (error: any) {
      console.error("Signup Error:", error);
      let description = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
        description = "This email is already registered. Please try logging in.";
      } else if (error.code === 'auth/weak-password') {
        description = "The password is too weak. Please use at least 6 characters.";
      } else {
        description = error.message;
      }
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: description,
      });
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`name-signup-${role}`}>Full Name</Label>
        <Input id={`name-signup-${role}`} placeholder="John Doe" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`email-signup-${role}`}>Email</Label>
        <Input 
          id={`email-signup-${role}`} 
          type="email" 
          placeholder="user@example.com" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`password-signup-${role}`}>Password</Label>
        <Input 
          id={`password-signup-${role}`} 
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        Create Account
      </Button>
    </form>
  );
}
