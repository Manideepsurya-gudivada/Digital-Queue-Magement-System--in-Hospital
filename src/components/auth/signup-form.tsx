'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function SignupForm() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd perform registration and then login.
    // For this demo, we'll just redirect to the patient dashboard.
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name-signup">Full Name</Label>
        <Input id="name-signup" placeholder="John Doe" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-signup">Email</Label>
        <Input id="email-signup" type="email" placeholder="user@example.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-signup">Password</Label>
        <Input id="password-signup" type="password" required />
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        Create Account
      </Button>
    </form>
  );
}
