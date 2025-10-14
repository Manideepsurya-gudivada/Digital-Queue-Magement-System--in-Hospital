'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@/firebase';
import { initiateEmailSignUp } from '@/firebase/non-blocking-login';

export function SignupForm() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would also collect other user details (like name)
    // and create a user document in Firestore.
    initiateEmailSignUp(auth, email, password);
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name-signup">Full Name</Label>
        <Input id="name-signup" placeholder="John Doe" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-signup">Email</Label>
        <Input 
          id="email-signup" 
          type="email" 
          placeholder="user@example.com" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-signup">Password</Label>
        <Input 
          id="password-signup" 
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
