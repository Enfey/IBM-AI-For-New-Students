"use client";

import React, { useEffect } from "react";
import ResourceTile from "./components/ResourceTile/ResourceTile";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { resources } from "./data/data";
import withAuth from "@/components/AuthBlock/AuthBlock";
import "./resource-page.scss";

function ResourcePage() {
    const { isLoggedIn, isInitialised } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialised && !isLoggedIn) {
            router.replace("/"); // could redirect to /login in future and separate / from its component parts
        }
    }, [isInitialised, isLoggedIn, router]);

    return (
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
    );
}

export default withAuth(ResourcePage);
