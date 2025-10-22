'use client';

import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/icons';

export default function AuthenticationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg">
            <div className="flex flex-col items-center text-center">
                 <div className="bg-primary p-3 rounded-full mb-4">
                    <Logo className="w-10 h-10 text-primary-foreground" />
                 </div>
                <h1 className="mt-2 text-2xl font-bold text-primary font-headline">
                    HealthCare
                </h1>
                <p className="text-muted-foreground text-sm mt-1">Hospital Management System</p>
            </div>
            <LoginForm />
        </div>
      </div>
    </div>
  );
}
