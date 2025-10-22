'use client';

import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/icons';

export default function AuthenticationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 p-4">
      <div className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl shadow-2xl">
        <div className="hidden md:block bg-blue-300/50 backdrop-blur-lg p-12">
            {/* You can add a nice graphic or message here */}
        </div>
        <div className="bg-white p-8 sm:p-12">
            <div className="flex flex-col items-center text-center">
                 <Logo className="w-16 h-16 text-blue-600" />
                <h1 className="mt-4 text-2xl font-bold text-blue-800 font-headline">
                    HealthCare Hospitals
                </h1>
            </div>
            <LoginForm />
        </div>
      </div>
    </div>
  );
}
