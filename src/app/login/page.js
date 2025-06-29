"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "./components/AuthForm/AuthForm";
import { useAuth } from "@/hooks/useAuth";
/**
 * Login page component
 *
 * * Serves as auth entry point for app.
 * * Handles redirection based on authentication state, preventing access if user is already logged in.
 *
 * Uses:
 * @see {@link useAuth} Custom hook for authentication state
 * @see {@link useRouter} From next/navigation for routing
 * @see {@link AuthForm} Component for rendering the authentication form
 *
 * @returns {JSX.Element} Rendered login page with authentication form.
 */
function LoginPage() {
    const router = useRouter();
    const { isLoggedIn, isInitialised } = useAuth();
    
    useEffect(() => {
        // Wait for auth to be determined
        if (!isInitialised) return;
    
        if (isLoggedIn && router) {
        // Redirect to loading page if user is already logged in
        router.push("/loading");
        }
    }, [isLoggedIn, isInitialised, router]);
    
    //Prevents flicker while waiting for auth to be determined
    if (!isInitialised) return null;

	return (<div>
        <AuthForm defaultMode="login" />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <span className={"declaimer"}>By signing up, you allow us to collect your google account information for future use.</span>
    </div>);
}

export default LoginPage;