import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * 'Context' for managing the theme of the application (light/dark mode)
 * 
 * @typedef {Object} ThemeContextType
 * @property {boolean} isDarkMode - Current theme state
 * @property {() => void} toggleTheme - Function to toggle between light/dark modes
 * 
 * @type {React.Context<ThemeContextType>}
 */

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

/**
 * Handles:
 * - Loading theme from localStorage or system preference
 * - Updating the DOM with 'dark-theme' class
 * - Saving theme changes to localStorage via 'isDarkMode' state
 * Wrap application in this 'ThemeProvider' to provide theme data to child components
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the theme
 * @returns {JSX.Element} Rendered component
 */
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
  // Initially runs on the server.
  if (typeof window === 'undefined') {
    return false; // Default theme for initial server render
  }
  
  // Client-side, check localStorage
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) {
    return JSON.parse(saved);
  }
  
  // Fallback 
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply theme class and save preference when theme changes 
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access the current theme state and toggle function
 * 
 * @example
 * const { isDarkMode, toggleTheme } = useTheme();
 * 
 * @returns {ThemeContextType} Theme context values
 */
export const useTheme = () => useContext(ThemeContext);