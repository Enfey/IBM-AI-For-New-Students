"use client";

import {Button, TextArea} from "@carbon/react";
import {WebChatCustomElement} from '@ibm-watson/assistant-web-chat-react';

const watsonAssistantChatOptions = {
  integrationID: "fdc6b027-684b-49a3-a8c0-82e0c7c90c97", // The ID of this integration.
  region: "eu-gb", // The region your integration is hosted in.
  serviceInstanceID: "f0d47658-0d2a-4a9e-a2b0-454062c0bf3d", // The ID of your service instance.
}

export default function RepoPage() {
  return <div className={"grid_container"}>
    <div className={"left_column"}>
    </div>
    <WebChatCustomElement className="middle_column" config={watsonAssistantChatOptions} />
    <div className={"right_column"}>
    </div>
  </div>
}
