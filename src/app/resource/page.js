"use client";

import React, {useEffect} from 'react';
import {Book, Events, Globe, Home, Screen, User} from "@carbon/icons-react";
import ResourceTile from "./components/ResourceTile/ResourceTile";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import "./resource-page.scss";

const resources = [
    { title: "University Homepage", link: "https://www.nottingham.ac.uk/", icon: <Globe size={64} /> },
    { title: "Library Services", link: "https://www.nottingham.ac.uk/library/", icon: <Book size={64} /> },
    { title: "Student Portal", link: "https://studentlife.nottingham.ac.uk/students/login?ReturnUrl=%2fstudents", icon: <User size={64} /> },
    { title: "NottinghamHub", link: "https://campus.nottingham.ac.uk/psp/csprd/?cmd=login", icon: <Home size={64} /> },
    { title: "IT Service", link: "https://www.nottingham.ac.uk/dts/help/it-service-desk/it-service-desk.aspx", icon: <Screen size={64} /> },
    { title: "Student Society", link: "https://su.nottingham.ac.uk/societies", icon: <Events size={64} /> },
];

export default function ResourcePage() {
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
                <div className="resource-container">
                    {resources.map((resource, index) => (
                        <ResourceTile
                            title={resource.title}
                            link={resource.link}
                            icon={resource.icon}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </>
    );
}