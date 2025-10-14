'use client';

import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { users } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const router = useRouter();
  const auth = useAuth() as Auth;
  const { user, isUserLoading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && user) {
      const matchedUser = users.find(u => u.email === user.email);
      if (matchedUser?.role === 'ADMIN') {
        router.push('/admin');
      } else if (matchedUser?.role === 'DOCTOR') {
        router.push('/doctor');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, isUserLoading, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error("Login Error:", error);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message === 'Firebase: Error (auth/invalid-credential).'
            ? "Invalid email or password. Please try again."
            : error.message,
        });
      });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email-login">Email</Label>
        <Input
          id="email-login"
          type="email"
          placeholder="user@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-login">Password</Label>
        <Input 
          id="password-login" 
          type="password" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        Login
      </Button>
    </form>
  );
}
