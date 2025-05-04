"use client";

import withAuth from "@/components/AuthBlock/AuthBlock";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import "./settings-page.scss";
import LanguageBox from "@/app/settings/components/LanguageBox/LanguageBox"; // 引入 LanguageBox 组件
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

    // 从 localStorage 获取当前语言并更新状态
    useEffect(() => {
        const language = localStorage.getItem("language") || "English"; // 默认为英语
        setCurrentLanguage(language);
    }, []);

    // 语言变化时更新 currentLanguage 状态
    const handleLanguageChange = (newLanguage) => {
        setCurrentLanguage(newLanguage); // 更新 currentLanguage 状态，触发页面重渲染
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
                        <p>{`Current language is: ${currentLanguage}`}</p> {/* 当前语言实时更新 */}
                    </div>
                    {/* 传递 currentLanguage 和 onLanguageChange */}
                    <LanguageBox onLanguageChange={handleLanguageChange} />
                </div>
            </div>
        </div>
    );
}

export default withAuth(SettingsPage);

