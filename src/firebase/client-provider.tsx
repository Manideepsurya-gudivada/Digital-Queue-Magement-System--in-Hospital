'use client';

import React, { useMemo, type ReactNode, useEffect } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    const createDemoUsers = async () => {
      const demoUsers = [
        { email: 'admin@mediqueue.pro', password: 'password' },
        { email: 'evelyn.reed@mediqueue.pro', password: 'password' },
      ];

      for (const demoUser of demoUsers) {
        try {
          // We try to create the user. If it fails because the user already exists,
          // we catch the error and do nothing, which is the desired behavior.
          await createUserWithEmailAndPassword(firebaseServices.auth, demoUser.email, demoUser.password);
          console.log(`Successfully created demo user: ${demoUser.email}`);
        } catch (error: any) {
          // This error is expected if the user already exists, so we can safely ignore it.
          if (error.code !== 'auth/email-already-in-use') {
            console.error(`Failed to create demo user ${demoUser.email}:`, error);
          }
        }
      }
    };

    createDemoUsers();
  }, [firebaseServices.auth]);

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
