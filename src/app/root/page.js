"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function RootPage() {
  const { isLoggedIn, isInitialised } = useAuth();
  const router = useRouter();
  
  // Immediate redirect - based on auth state
  useEffect(() => {
    if (isInitialised) {
      if (isLoggedIn) {
        router.replace('/loading');
      } else {
        router.replace('/login');
      }
    }
  }, [isLoggedIn, isInitialised, router]);

  // Loading state while auth is initialising - REMOVE BEFORE COMMIT
  return (
    <div className="container">
      <div className="loading-screen">
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
}