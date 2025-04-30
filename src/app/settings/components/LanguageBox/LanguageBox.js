import React, { useState, useEffect } from 'react';
import { Dropdown } from '@carbon/react';

const LanguageBox = ({ onLanguageChange }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('English'); // 默认语言为英语

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
        const language = localStorage.getItem('language') || 'English'; // 默认为英语
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
                helperText="Select your preferred language"
                id="language-dropdown"
                invalidText="Invalid selection"
                itemToString={(item) => (item ? item.text : '')}
                items={items}
                label="Language"
                titleText="Choose your language"
                type="default"
                warnText="Please select a language"
                onChange={({ selectedItem }) => handleLanguageChange(selectedItem)} // 处理语言选择
                selectedItem={items.find(item => item.text === selectedLanguage)} // 默认选中当前语言
            />
        </div>
    );
};

export default LanguageBox;





