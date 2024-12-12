// Use client directive to run this code clientside
"use client";

import { ArrowRight } from '@carbon/icons-react';
import { TextArea, Button } from '@carbon/react';
import {WebChatCustomElement} from '@ibm-watson/assistant-web-chat-react';

// Options for the Watson Embedded Chatbot
const watsonAssistantChatOptions = {
  integrationID: "fdc6b027-684b-49a3-a8c0-82e0c7c90c97", // The ID of this integration.
  region: "eu-gb", // The region your integration is hosted in.
  serviceInstanceID: "f0d47658-0d2a-4a9e-a2b0-454062c0bf3d",// The ID of your service instance.
  openChatByDefault: true,
  headerConfig: {
    hideMinimizeButton: true,
  }
}

// Returns formatted timestamp
const formatTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
};

async function onSubmitClick() {
    // Fetches textArea for user input
    const textArea = document.querySelector('textarea');

    // Uses fetch API to send a POST request to the back-end to get a response from the WatsonX Assistant
    const response = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({
            message: textArea.value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    // Converts response object to JSON and creates two divs, one for user and one for the chatbot
    // Assigns unique class identifiers so the respective styles can be applied
    const json = await response.json();
    const userMessage = document.createElement('div');
    userMessage.className = 'message user_message';

    const aiMessage = document.createElement('div');
    aiMessage.className = 'message watson_message';

    // Handles the output message depending on if the status returned an error or success
    let returnMessage;
    switch (json.status) {
        case "success":
            returnMessage = json.text;
            break
        case "error":
            returnMessage = "Sorry, I didn't get that. Could you repeat your message?";
            break;
    }

    // Sets the text of each message
    userMessage.textContent = textArea.value;
    aiMessage.textContent = returnMessage;

    // Adds both of the divs to the message container
    document.querySelector('.message_container').appendChild(userMessage)
    document.querySelector('.message_container').appendChild(aiMessage);#

    // Clears the contents of the textArea
    textArea.value = '';
}

export default function ChatPage() {
  return (
    <div className='layout_container'>
      <div className="left_column"></div>
      <div className="message_container">
      </div>
      <div id="user_input_area">
          <TextArea placeholder="Enter your query." style={{ resize: 'none' }}/>
          <Button renderIcon = { ArrowRight } onClick={() => onSubmitClick()}>Send</Button>
      </div>

      {/*<WebChatCustomElement config={watsonAssistantChatOptions} className='web_chat_column' /> */}
      <div className="right_column"></div>
    </div>
  );
}
