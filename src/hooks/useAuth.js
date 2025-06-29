import { useState, useEffect } from "react";
import { auth } from "../util/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

/**
 * Custom hook to manage user authentication state
 *
 * This hook:
 * - Listens for authentication state changes and updates internal state accordingly
 * - Provides a method to log out the current user
 *
 * @see {@link https://firebase.google.com/docs/auth}
 *
 * @returns {Object} Authentication state and methods
 * @returns {boolean} return.isLoggedIn - Whether user is currently authenticated
 * @returns {boolean} return.isInitialised - Whether auth state has finished initial loading
 * @returns {Function} return.logout - Function to sign out the current user
 */
export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isInitialised, setIsInitialised] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    // Listen for auth state changes and update state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            setIsInitialised(true);
            setProfilePicture(user?.photoURL || null);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return { isLoggedIn, logout, isInitialised, profilePicture };
};
