// Use client directive to run this code clientside
"use client";

import { ArrowRight } from '@carbon/icons-react';
import { TextArea, Button } from '@carbon/react';

let sessionID = null

function scrollToBottom() {
    const container = document.querySelector('.message_container');
    if (container) {
        // use requestAnimationFrame to ensure smooth scrolling
        requestAnimationFrame(() => {
            container.scrollTop = container.scrollHeight;

            // wait for the container to update and then scroll again to ensure smooth scrolling
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 50);
        });
    }
}

async function onSubmitClick() {
    // Fetches textArea for user input
    const textArea = document.querySelector('textarea');

    if (sessionID == null) {
        const response = await fetch('/api/create_session');
        const data = await response.json();
        sessionID = data.payload
    }

    // Converts response object to JSON and creates two divs, one for user and one for the chatbot
    // Assigns unique class identifiers so the respective styles can be applied
    const userMessage = document.createElement('div');
    userMessage.className = 'message user_message';

    // Creates an image element for the user and adds besides the message
    userMessage.textContent = textArea.value;
    const userImg = document.createElement('img');
    userImg.src = "/image/OIP.jpg";
    userImg.alt = "User";
    userImg.classList.add('userImg');

    // Adds both of the divs to the message container
    document.querySelector('.message_container').appendChild(userImg)
    document.querySelector('.message_container').appendChild(userMessage)
    // Clears the contents of the textArea
    textArea.value = '';

    // Creates an image element for the chatbot
    const aiImg = document.createElement('img');
    aiImg.src = "/image/duck.png";
    aiImg.alt = "AI";
    aiImg.classList.add('aiImg');
    document.querySelector('.message_container').appendChild(aiImg)
    scrollToBottom();

    // Uses fetch API to send a POST request to the back-end to get a response from the WatsonX Assistant
    const response = await fetch('/api/send_message', {
        method: 'POST',
        body: JSON.stringify({
            message: userMessage.textContent,
            session_id: sessionID
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    // Fetches the response from the back-end and creates a div for the chatbot
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message watson_message';
    const jsonOutput = await response.json();

    let message;
    // Depending on the status of the response, sets the message text and adds suggestions if available
    switch (jsonOutput.status) {
        case "INPUT_SUCCESS":
            // If the response contains suggestions, display them in a separate message
            if (jsonOutput.suggestions.length > 0){
                message = "Suggestions: \n"+ jsonOutput.suggestions.join(", ")
            }else{
                message = jsonOutput.texts +　"\n" + jsonOutput.options
            }
            break
        case "INPUT_FAIL":
            message = "Sorry, I didn't get that. Could you repeat your message again?"
            break
    }

    // Adds the message to the chat container
    aiMessage.textContent = message
    document.querySelector('.message_container').appendChild(aiMessage);
    scrollToBottom();
}

export default function ChatPage() {
    return (
        <div className='layout_container'>
            <div className="left_column"></div>
            <div className="message_container">
            </div>

            <div id="chat_container">
                <div id="user_input_area">
                    <TextArea
                        className="chat-textarea"
                        placeholder="Enter your query here."
                    />
                    <Button
                        className="send-button"
                        renderIcon={ArrowRight}
                        onClick={() => onSubmitClick()}
                    >
                    </Button>
                </div>
            </div>

            <div className="right_column"></div>
        </div>
    );
}

