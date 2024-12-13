// Use client directive to run this code clientside
"use client";

import { ArrowRight } from '@carbon/icons-react';
import { TextArea, Button } from '@carbon/react';

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

    // Converts response object to JSON and creates three divs, one for user and one for the chatbot and one for the timestamp of the user message
    // Assigns unique class identifiers so the respective styles can be applied
    const json = await response.json();

    const userMessage = document.createElement('div');
    userMessage.className = 'message user_message';

    const aiMessage = document.createElement('div');
    aiMessage.className = 'message watson_message';
    
    const userTimestamp = document.createElement('div');
    userTimestamp.className = 'timestamp';

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

    // Sets the text of each message and timestamp
    userMessage.textContent = textArea.value;
    aiMessage.textContent = returnMessage;
    userTimestamp.textContent = formatTimestamp();

    // Adds both of the divs to the message container and appends the timestamp to the user message
    document.querySelector('.message_container').appendChild(userMessage)
    document.querySelector('.message_container').appendChild(aiMessage);
    userMessage.appendChild(userTimestamp);

    // Clears the contents of the textArea
    textArea.value = '';

    // Scrolls to the bottom of the page
    window.scrollTo(0, document.body.scrollHeight);
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

      <div className="right_column"></div>
    </div>
  );
}
