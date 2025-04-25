"use client";

import withAuth from "@/components/AuthBlock/AuthBlock";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import "./settings-page.scss";

function SettingsPage() {
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
    </div>
  );
}

export default withAuth(SettingsPage);