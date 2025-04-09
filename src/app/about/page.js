"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import InfoSection from "./components/InfoSection/InfoSection";
import { aboutData, projectData } from "./data/data";
import withAuth from "@/components/AuthBlock/AuthBlock";
import "./about-page.scss";

/**
 * About page component
 * @todo add further comment
 *
 * @returns {JSX.Element|null} The about page UI
 */
function AboutPage() {
    const { isLoggedIn, isInitialised } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialised && !isLoggedIn) {
            router.replace("/");
        }
    }, [isInitialised, isLoggedIn, router]);

    return (
        <div className="about-container">
            <div className="about-inner-container">
                <ImageSlider />

                <InfoSection {...aboutData} className="about-info" />

                <InfoSection {...projectData} className="project-info" />
            </div>
        </div>
    );
}

export default withAuth(AboutPage);
