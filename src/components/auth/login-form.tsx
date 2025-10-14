
'use client';

import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The redirect will be handled by the useEffect hook
    } catch (error: any) {
      console.error("Login Error:", error);
      let description = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        description = "Invalid email or password. Please try again.";
      } else {
        description = error.message;
      }
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: description,
      });
    }
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
