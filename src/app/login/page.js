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
export default function LoginPage() {
	const { isLoggedIn, isInitialised } = useAuth();
	const router = useRouter();

	// Redirect if user is already logged in
	useEffect(() => {
		if (isInitialised && isLoggedIn) {
			router.replace("/loading");
		}
	}, [isLoggedIn, isInitialised, router]);

	if (!isInitialised || isLoggedIn) {
		return null;
	}

	return <AuthForm defaultMode="login" />;
}
