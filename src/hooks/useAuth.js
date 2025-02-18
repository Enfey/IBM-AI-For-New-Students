import { useState, useEffect } from 'react';
import { auth } from '../util/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialised, setIsInitialised] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsInitialised(true);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { isLoggedIn, logout, isInitialised };
};