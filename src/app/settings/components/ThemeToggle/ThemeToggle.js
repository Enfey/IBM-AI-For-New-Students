"use client";

import { useTheme } from "@/app/contexts/ThemeContext";
import { Toggle } from "@carbon/react";
import "./theme-toggle.scss";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleToggle = () => {
    console.log("Toggle clicked, current isDarkMode:", isDarkMode);
    toggleTheme();
  };

  return (
    <div className="theme-toggle-container">
      <span className="theme-icon">☀️</span>
      <Toggle toggled={isDarkMode} onToggle={handleToggle} hideLabel id="theme-toggle" />
      <span className="theme-icon">🌙</span>
    </div>
  );
}