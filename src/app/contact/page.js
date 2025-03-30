"use client";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import ContactTile from "./components/ContactTile/ContactTile";


const contactMethods = [
    {
        title: "📞 Phone Contact",
        content: "Call us on +1 555 555 5555",
    },
    {
        title: "📧 Email Contact",
        content: "Email us at EMAIL",
    },
    {
        title: "🏛 Website Contact",
        content: "Add a discussion to our git repo: ",
    },
    {
        title: "📝 Feedback Survey",
        content: "Please fill out our feedback survey to help us improve our services."
        + "\n survey link: https://www.fffff",
    }
];

/**
 * Contact page component
 * 
 * * Protected by auth - redirects to login if not authenticated.
 * * Renders a list of contact methods using the ContactTile component.
 * 
 * * Uses:
 * @see {@link useAuth} Custom hook for authentication state
 * @see {@link useRouter} From next/navigation for routing
 * @see {@link ContactTile} Component for rendering individual contact methods
 * 
 * @returns {JSX.Element|null} The contact page UI, null when not logged in
 */
export default function ContactPage() {
    const { isLoggedIn, isInitialised } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialised && !isLoggedIn) {
            router.replace('/login');
        }
    }, [isInitialised, isLoggedIn, router]);


    return (
        <>
            {!isLoggedIn ? null : (
                <div className="contact_tile_container">
                    {contactMethods.map((item, index) => (
                        <ContactTile 
                            title={item.title}
                            content={item.content}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </>
    );
}