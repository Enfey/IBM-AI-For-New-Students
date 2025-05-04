"use client";

import ImageSlider from "./components/ImageSlider/ImageSlider";
import InfoSection from "./components/InfoSection/InfoSection";
import { aboutData, projectData } from "./data/data";
import withAuth from "@/components/AuthBlock/AuthBlock";
import "./about-page.scss";

/**
 * About page component
 * * Serves as the about page of the application, displaying information about the project and team.
 * * Protected by auth - redirects to login by default if not authenticated.
 *
 * Uses:
 * @see {@link ImageSlider} Component for displaying a slider of images
 * @see {@link InfoSection} Component for displaying information sections
 * @see {@link withAuth} Custom auth HOC for delegating authentication checks for pages
 * @see {@link aboutData} and {@link projectData} for data used in the info sections
 *
 * @returns {JSX.Element|null} The about page UI, null if not authenticated.
 */
function AboutPage() {
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
