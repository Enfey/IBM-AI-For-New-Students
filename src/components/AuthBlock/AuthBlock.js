"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import Loading from "@carbon/react/es/components/Loading/Loading";
import "./auth-block.scss";

/**
 * Higher-Order Component that wraps pages requiring authentication
 * 
 * @param {React.ComponentType} Component - The component to wrap with authentication check
 * @param {Object} options - Configuration options
 * @param {string} [options.redirectUrl="/login"] - URL to redirect unauthenticated users
 * @returns {React.FC} Protected component that redirects unauthenticated users
 */
export default function withAuth(Component, options = { redirectUrl: "/login" }) {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const { isLoggedIn, isInitialised } = useAuth();
    const [isAuthorised, setIsAuthorised] = useState(false);

    useEffect(() => {
      // Skip during SSR
      if (typeof window === "undefined") return;
      
      // Wait for auth to be determined
      if (!isInitialised) return;
      
      if (!isLoggedIn && router) {
        // Redirect
        router.push(options.redirectUrl);
      } else {
        // User is authenticated and authorised
        setIsAuthorised(true);
      }
    }, [isLoggedIn, isInitialised, router, options.redirectUrl]);

    //Loading spinner nukes load time, so removed.
    if (!isInitialised && !isAuthorised) { 
        return null;
    }

    // Render component 
    return <Component {...props} />;
  };
}