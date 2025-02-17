'use client';

// Icons
import { ArrowRight, Menu } from "@carbon/icons-react";
// Components on page
import { Button, TextArea, Theme } from "@carbon/react";
// Components that make up header
import {
    Header,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
} from "@carbon/react";

export default function MenuPage() {
    return (
        <Theme theme={'white'}>
            <Header aria-label="Team 32 AI">
                <HeaderName href="" prefix="Team 32">
                    AI
                </HeaderName>
                <HeaderGlobalBar>
                    <HeaderGlobalAction aria-label="Menu">
                        <Menu size={20} tooltipAligment="end"></Menu>
                    </HeaderGlobalAction>
                </HeaderGlobalBar>
            </Header>
            <TextArea labelText="Enter your prompt" hideLabel={true} placeholder="Enter your prompt"></TextArea>
            <Button renderIcon={ArrowRight}>Submit</Button>
        </Theme>
    )
}
