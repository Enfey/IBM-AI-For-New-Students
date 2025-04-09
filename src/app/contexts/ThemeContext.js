"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create theme context with default values
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

/**
 * Theme provider component
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme state from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initially runs on the server
    if (typeof window === 'undefined') {
      return false; // Default theme for initial server render
    }
    
    // Client-side, check localStorage
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Toggle theme function (important to implement this!)
  const toggleTheme = () => {
    console.log('Toggle theme called, current state:', isDarkMode);
    setIsDarkMode(prevState => !prevState);
  };

  // Apply theme class and save preference when theme changes
  useEffect(() => {
    console.log('Theme effect running, isDarkMode:', isDarkMode);
    
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('darkMode', JSON.stringify(true));
      console.log('Dark theme applied');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('darkMode', JSON.stringify(false));
      console.log('Light theme applied');
    }
  }, [isDarkMode]);

  // Provide theme context to children
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for accessing theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}