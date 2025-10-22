'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { users } from '@/lib/data'; // for role-based redirect

export function LoginForm() {
  const router = useRouter();
  const auth = useAuth() as Auth;
  const { user, isUserLoading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const demoUsers = ['admin@mediqueue.pro', 'evelyn.reed@mediqueue.pro', 'reception@mediqueue.pro'];
  const isDemoUser = demoUsers.includes(email);

  useEffect(() => {
    if (!isUserLoading && user) {
        // Find user role from mock data
        const loggedInUser = users.find(u => u.email === user.email);
        if (loggedInUser?.role === 'ADMIN') {
            router.push('/admin');
        } else if (loggedInUser?.role === 'DOCTOR') {
            router.push('/doctor');
        } else if (loggedInUser?.role === 'RECEPTIONIST') {
            router.push('/receptionist');
        } else {
            router.push('/dashboard');
        }
    }
  }, [user, isUserLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loginPassword = isDemoUser ? 'password' : password;

    try {
      await signInWithEmailAndPassword(auth, email, loginPassword);
      // Redirect is handled by useEffect
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
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="mt-8 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email-login" className="sr-only">Email</Label>
        <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email-login"
              type="email"
              placeholder="user@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 text-base"
            />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-login" className="sr-only">Password</Label>
        <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              id="password-login" 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password"
              required 
              value={isDemoUser ? 'password' : password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isDemoUser}
              className="pl-10 text-base"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
            <Checkbox id="remember-me" />
            <Label htmlFor="remember-me" className="text-gray-600">Remember Me</Label>
        </div>
      </div>
       <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold text-base" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
      </Button>
       <div className="text-center text-sm space-y-2 mt-4">
          <p>
            <Link href="#" className="font-medium text-blue-600 hover:underline">
              Register Now
            </Link>
          </p>
          <p>
            <Link href="#" className="font-medium text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </p>
       </div>
        <p className="px-4 text-center text-xs text-muted-foreground mt-4">
          Demo: Use `admin@mediqueue.pro`, `evelyn.reed@mediqueue.pro`, or `reception@mediqueue.pro` with password `password`.
        </p>
    </form>
  );
}
