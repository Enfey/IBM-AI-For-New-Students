"use client";

import { TextArea, Button } from '@carbon/react';
import {WebChatCustomElement} from '@ibm-watson/assistant-web-chat-react';

const watsonAssistantChatOptions = {
  integrationID: "fdc6b027-684b-49a3-a8c0-82e0c7c90c97", // The ID of this integration.
  region: "eu-gb", // The region your integration is hosted in.
  serviceInstanceID: "f0d47658-0d2a-4a9e-a2b0-454062c0bf3d",// The ID of your service instance.
  openChatByDefault: true,
  headerConfig: {
    hideMinimizeButton: true,
  }
}

const formatTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
};

export default function ChatPage() {
  return (
    <div className='layout_container'>
      <div className="left_column"></div>
      <div className="message_container">
        <div className="message user_message">Hello, I am a new student. Can you help me?</div>  
      </div>

      <div id="user_input_area">
          <TextArea placeholder="Enter your query." style={{ resize: 'none' }}/>

          <Button onClick={() => {
          const textArea = document.querySelector('textarea');
          const userMessage = document.createElement('div');
          userMessage.className = 'message user_message';
          userMessage.textContent = textArea.value;
          document.querySelector('.message_container').appendChild(userMessage);
          textArea.value = '';
        }}>Send</Button>
      </div>

      {/*<WebChatCustomElement config={watsonAssistantChatOptions} className='web_chat_column' /> */}
      <div className="right_column"></div>
    </div>
  );
}
