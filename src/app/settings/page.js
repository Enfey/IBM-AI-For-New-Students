"use client";

import withAuth from "@/components/AuthBlock/AuthBlock";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import "./settings-page.scss";
import LanguageBox from "@/app/settings/components/LanguageBox/LanguageBox"; // Import LanguageBox component
import { useEffect, useState } from "react";

/**
 * Settings page component
 * * Serves as the settings page of the application, allowing users to change theme and language settings.
 * * Protected by auth - redirects to login by default if not authenticated.
 * 
 * Uses:
 * - {@link ThemeToggle} Component for toggling between light and dark themes
 * - {@link LanguageBox} Component for selecting the language
 * - {@link withAuth} Custom auth HOC for delegating authentication checks for pages
 * 
 * @returns {JSX.Element|null} The settings page UI, null if not authenticated.
 * */

function SettingsPage() {
    const [currentLanguage, setCurrentLanguage] = useState("English");

    // Get language from local storage and update the state
    useEffect(() => {
        const language = localStorage.getItem("language") || "English"; // Default is English
        setCurrentLanguage(language);
    }, []);

    // Update current language when language state changes
    const handleLanguageChange = (newLanguage) => {
        setCurrentLanguage(newLanguage); // Update current language state, triggering re-rendering
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>

            <div className="settings-section">
                <h2>Appearance</h2>
                <div className="setting-item">
                    <div className="setting-label">
                        <h3>Theme</h3>
                        <p>Switch between light and dark mode</p>
                    </div>
                    <ThemeToggle />
                </div>
            </div>

            <div className="settings-section">
                <h2>Language</h2>
                <div className="setting-item">
                    <div className="setting-label">
                        <h3>Current Language</h3>
                        <p>{`Current language is: ${currentLanguage}`}</p> {/* Language is updated in real-time */}
                    </div>
                    {/* Passing currentLanguage & onLanguageChange */}
                    <LanguageBox onLanguageChange={handleLanguageChange} />
                </div>
            </div>
        </div>
    );
}

export default withAuth(SettingsPage);

