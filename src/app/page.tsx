'use client';

import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/login-form';
import { SignupForm } from '@/components/auth/signup-form';
import { Logo } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AuthenticationPage() {
  const bgImage = PlaceHolderImages.find(img => img.id === 'login-background');
  
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        {bgImage && (
             <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                fill
                className="object-cover"
                data-ai-hint={bgImage.imageHint}
             />
        )}
        <div className="relative z-20 flex items-center text-lg font-medium font-headline text-primary-foreground drop-shadow-lg">
          <Logo className="mr-2 h-8 w-8 text-accent" />
          MediQueue Pro
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2 bg-black/50 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-lg text-primary-foreground">
              &ldquo;This platform has revolutionized our patient flow, reducing wait times by over 30%. It's intuitive for both our staff and patients.&rdquo;
            </p>
            <footer className="text-sm text-primary-foreground/80">Dr. Evelyn Reed</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 flex items-center justify-center w-full">
        <Card className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center text-lg font-medium font-headline">
              <Logo className="mr-2 h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline">Welcome to MediQueue Pro</CardTitle>
            <CardDescription>Select your role to sign in or create an account.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patient" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patient">I'm a Patient</TabsTrigger>
                <TabsTrigger value="staff">I'm a Doctor / Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="patient" className="pt-4">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="pt-4">
                    <LoginForm role="PATIENT" />
                  </TabsContent>
                  <TabsContent value="signup" className="pt-4">
                    <SignupForm role="PATIENT" />
                  </TabsContent>
                </Tabs>
              </TabsContent>
              <TabsContent value="staff" className="pt-4">
                <LoginForm role="DOCTOR" />
                <p className="px-8 text-center text-sm text-muted-foreground mt-4">
                  Demo Login: `admin@mediqueue.pro` or `evelyn.reed@mediqueue.pro`
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
