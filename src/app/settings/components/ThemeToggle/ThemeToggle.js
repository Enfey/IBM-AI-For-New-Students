"use client";

import { useTheme } from "@/app/contexts/ThemeContext";
import { Toggle } from "@carbon/react";
import "./theme-toggle.scss";

/**
 * ThemeToggle component
 * * A toggle switch for changing the theme of the entire app between light and dark modes.
 * 
 * Uses:
 * - {@link useTheme} from ThemeContext for managing theme state and toggling functionality
 * - {@link Toggle} from Carbon Design System for the toggle switch UI
 * 
 * @returns {JSX.Element} Rendered theme toggle switch
 * */
export default function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useTheme();

    // Peak
    const handleToggle = () => {
        toggleTheme();
    };

    return (
        <div className="theme-toggle-container">
            <span className="theme-icon">☀️</span>
            <Toggle
                aria-label="Toggle theme" //#Accessible
                toggled={isDarkMode}
                onToggle={handleToggle} 
                hideLabel
                id="theme-toggle"
            />
            <span className="theme-icon">🌙</span>
        </div>
    );
}
