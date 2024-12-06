"use client";

import { RadioButtonGroup, RadioButton } from "@carbon/react";

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