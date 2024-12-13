"use client";

import { RadioButtonGroup, RadioButton } from "@carbon/react";

/**
 * SettingsPage component
 * 
 * This component renders the settings page via Carbon Components for React.
 * Currently, allows users to choose a preferred theme from a list of radio buttons.
 * @returns {JSX.Element} The settings page component
 */
export default function SettingsPage() {
    return (
        <RadioButtonGroup legendText="Theme" name="theme-group">
            <RadioButton labelText = "White"></RadioButton>
            <RadioButton labelText = "Light Grey"></RadioButton>
            <RadioButton labelText = "Dark Grey"></RadioButton>
            <RadioButton labelText = "Black"></RadioButton>
        </RadioButtonGroup>
    );
}