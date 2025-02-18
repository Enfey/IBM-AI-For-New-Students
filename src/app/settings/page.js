"use client";

import { Dropdown } from "@carbon/react";

/**
 * SettingsPage component
 * 
 * This component renders the settings page via Carbon Components for React.
 * 
 * Currently allows users to select from a dropdown menu between many
 * different language options
 * 
 * @returns {JSX.Element} The settings page component
 */
export default function SettingsPage() {
    return (
        <Dropdown 
            id="default"
            initialSelectedItem={{text: "English"}}
            /* Uses an arrow function with the conditional operator to
               to display the text in the dropdown items as their item
               strings */
            itemToString={(item) => (item ? item.text : "")}
            items={[
                {
                    text: "English"
                },
                {
                    text: "Spanish"
                },
                {
                    text: "French"
                },
                {
                    text: "German"
                },
                {
                    text: "Chinese"
                },
                {
                    text: "Arabic"
                },
                {
                    text: "Portuguese"
                },
                {
                    text: "Russian"
                }
            ]}
            label="Language"
            aria-label="Language"
            titleText="Language"
            type="default"
            onChange={(event) => onSubmitClick(event)}
        />
    );

    async function onSubmitClick(event) {
        console.log(itemTextToTargetLanguage(event.selectedItem.text))
    }

    /**
     * Translates the dropdown item text into its corresponding ISO-639
     * language code
     * 
     * @param {string} dropdown text to convert 
     * @returns {string} converted language code
     */
    function itemTextToTargetLanguage(item) {
        switch(item) {
            case "English":
                return "en";
            case "Spanish":
                return "es";
            case "French":
                return "fr";
            case "German":
                return "de";
            case "Chinese":
                return "zh";
            case "Arabic":
                return "ar";
            case "Portuguese":
                return "pt";
            case "Russian":
                return "ru";
        }
    }
}