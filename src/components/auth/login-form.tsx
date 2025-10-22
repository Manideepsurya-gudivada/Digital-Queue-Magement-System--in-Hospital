'use client';

import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import type { UserRole } from '@/lib/data';

interface LoginFormProps {
  role: UserRole;
}

export function LoginForm({ role }: LoginFormProps) {
  const router = useRouter();
  const auth = useAuth() as Auth;
  const { user, isUserLoading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  
  const isDemoUser = email === 'admin@mediqueue.pro' || email === 'evelyn.reed@mediqueue.pro';

  useEffect(() => {
    if (!isUserLoading && user) {
      if (email.startsWith('admin')) {
        router.push('/admin');
      } else if (role === 'DOCTOR' || email.startsWith('evelyn')) {
        router.push('/doctor');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, isUserLoading, router, email, role]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginPassword = isDemoUser ? 'password' : password;

    try {
      await signInWithEmailAndPassword(auth, email, loginPassword);
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
        <Label htmlFor={`email-login-${role}`}>Email</Label>
        <Input
          id={`email-login-${role}`}
          type="email"
          placeholder="user@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`password-login-${role}`}>Password</Label>
        <Input 
          id={`password-login-${role}`} 
          type="password" 
          required 
          value={isDemoUser ? 'password' : password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isDemoUser}
        />
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        Login
      </Button>
    </form>
  );
}
