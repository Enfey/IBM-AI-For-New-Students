import React, { useState, useEffect } from 'react';
import { Dropdown } from '@carbon/react';
import "./language-box.scss";

/**
 * LanguageBox component for selecting a language from a dropdown menu.
 *
 * * Allows users to select their preferred language from a list of options.
 * * The selected language is stored in local storage and can be retrieved later.
 * * The selected language is also passed to the parent component through the onLanguageChange callback.
 *
 * 
 * Uses:
 * - {@link Dropdown} from Carbon Design System for dropdown menu rendering
 *
 * @param {Object} props - Component props
 * @param {Function} props.onLanguageChange - Callback function to handle language change
 * 
 * @returns {JSX.Element} Rendered LanguageBox component
 * 
 * NOTE: Contains more state and logic than other components.
 */
const LanguageBox = ({ onLanguageChange }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default is English

    // language options
    const items = [
        { text: 'English' },
        { text: 'Spanish' },
        { text: 'French' },
        { text: 'German' },
        { text: 'Italian' },
        { text: 'Japanese' },
        { text: 'Chinese' }
    ];

    useEffect(() => {
        const language = localStorage.getItem('language') || 'English'; // Default is English
        setSelectedLanguage(language);
        onLanguageChange(language);
    }, [onLanguageChange]);

    const handleLanguageChange = (selectedItem) => {
        const language = selectedItem.text;
        setSelectedLanguage(language);
        onLanguageChange(language);
        localStorage.setItem('language', language);
    };

    return (
        <div style={{ width: 400 }}>
            <Dropdown
                aria-Label="Language selection dropdown"
                helperText="Select your preferred language"
                id="language-dropdown"
                invalidText="Invalid selection"
                itemToString={(item) => (item ? item.text : '')}
                items={items}
                label="Language"
                titleText="Choose your language"
                type="default"
                warnText="Please select a language"
                onChange={({ selectedItem }) => handleLanguageChange(selectedItem)} // Handles language selection using callback
                selectedItem={items.find(item => item.text === selectedLanguage)} // The current language is considered selected by default
            />
        </div>
    );
};

export default LanguageBox;





