'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { users } from '@/lib/data';

import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/icons';
import { HospitalInfoWidget } from '@/components/auth/hospital-info-widget';

export default function AuthenticationPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && user) {
            const currentUser = users.find(u => u.email === user.email);
            switch (currentUser?.role) {
                case 'ADMIN':
                    router.replace('/admin');
                    break;
                case 'DOCTOR':
                    router.replace('/doctor');
                    break;
                case 'PATIENT':
                    router.replace('/dashboard');
                    break;
                case 'RECEPTIONIST':
                    router.replace('/receptionist');
                    break;
                default:
                    router.replace('/dashboard');
            }
        }
    }, [user, isUserLoading, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 p-4">
            <div className="w-full max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg shadow-2xl overflow-hidden">
                    <div className="bg-primary p-8 sm:p-12 text-white flex flex-col justify-between">
                       <HospitalInfoWidget />
                    </div>
                    <div className="bg-white p-8 sm:p-12">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4">
                                <Logo className="w-16 h-16 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold text-primary font-headline">
                                HealthCare
                            </h1>
                            <p className="text-muted-foreground text-sm mt-1">Hospital Management System</p>
                        </div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
