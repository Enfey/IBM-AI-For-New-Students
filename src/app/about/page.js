"use client";

import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function AboutPage() {
    const { isLoggedIn, isInitialised } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialised && !isLoggedIn) {
            router.replace('/'); // could redirect to /login in future and separate / from its component parts
        }
    }, [isInitialised, isLoggedIn, router]);

    return (
        <>
            {!isLoggedIn ? null : (
                <div className="about-container">
                    <h1>About Page</h1>
                </div>
            )}
        </>
    );
}