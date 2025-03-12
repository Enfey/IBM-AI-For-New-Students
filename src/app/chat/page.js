// Use client directive to run this code clientside
"use client";

import React, { useEffect } from 'react';
import { ArrowRight } from '@carbon/icons-react';
import { TextArea, Button } from '@carbon/react';
import { marked } from 'marked';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import DynamicMap from '../api/google_map/route'

let sessionID = null

// Scrolls to the bottom of the chat container if the element is at least 60% of the container height
function maybeScrollToBottom() {
    const messageContainer = document.querySelector('.message_container');
    const lastChild = messageContainer.lastElementChild;
    if (!lastChild) return; // if no element, do nothing

    const containerHeight = messageContainer.clientHeight; // Get the height of the container
    const lastChildOffset = lastChild.offsetTop - messageContainer.scrollTop; // Calculate the offset of the last child from the top of the container

    if (lastChildOffset > containerHeight * 0.6) {
        setTimeout(() => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
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

    // Create a div for the user message wrapper
    const userMessageWrapper = document.createElement('div');
    userMessageWrapper.className = 'user_message_wrapper';

    // Creates a div for the user message
    const userMessage = document.createElement('div');
    userMessage.className = 'user_message';

    // Creates an image element for the user and adds besides the message
    userMessage.textContent = textArea.value;
    const userImg = document.createElement('img');
    userImg.src = "/image/OIP.jpg";
    userImg.alt = "User";
    userImg.classList.add('user_img');

    // Appends the user message and image to the message wrapper
    userMessageWrapper.appendChild(userImg);
    userMessageWrapper.appendChild(userMessage);
    document.querySelector('.message_container').appendChild(userMessageWrapper)

    // Clears the contents of the textArea
    textArea.value = '';

    // / Create a div for the ai message wrapper
    const aiMessageWrapper = document.createElement('div');
    aiMessageWrapper.className = 'ai_message_wrapper';

    // Creates an image element for the chatbot
    const aiImg = document.createElement('img');
    aiImg.src = "/image/duck.png";
    aiImg.alt = "AI";
    aiImg.classList.add('ai_img');
    document.querySelector('.message_container').appendChild(aiImg)

    // Scrolls to the bottom of the chat container
    maybeScrollToBottom();

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
    aiMessage.className = 'ai_message';
    const jsonOutput = await response.json();

    // Rather than being uninitialsed, send this message if one of the cases isn't entered like expected
    let message = "Sorry, something went wrong; please try again.";
    // Depending on the status of the response, sets the message text and adds suggestions if available
    switch (jsonOutput.status) {
        case "INPUT_SUCCESS":
            if (jsonOutput == []) {
                console.log("Error: empty response received")
            // If the response contains suggestions, display them in a separate message    
            } else if (jsonOutput.suggestions.length > 0) {
                message = "Suggestions: \n"+ jsonOutput.suggestions.join(", ")
            } else {
                message = jsonOutput.texts +　"\n" + jsonOutput.options
            }
            break
        case "INPUT_FAIL":
            message = "Sorry, I didn't get that. Could you repeat your message again?"
            break
    }

    // Adds the message to the chat container
    aiMessage.innerHTML = marked.parse(message);

    aiMessageWrapper.appendChild(aiImg);
    aiMessageWrapper.appendChild(aiMessage);
    document.querySelector('.message_container').appendChild(aiMessageWrapper);
    maybeScrollToBottom();
}

export default function ChatPage() {
    const { isLoggedIn, isInitialised } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialised && !isLoggedIn) {
          router.replace('/'); // could redirect to /login in future and separate / from its component parts 
        }
      }, [isInitialised, isLoggedIn, router]);

    useEffect(() => {
        const loadLive2DScript = () => {
            return new Promise((resolve, reject) => {
                if (window.OML2D) {
                    resolve();
                } else {
                    const script = document.createElement('script');
                    script.src = 'https://unpkg.com/oh-my-live2d@latest';
                    script.async = true;
                    script.onload = () => resolve();
                    script.onerror = () => reject(new Error('Live2D failed to load.'));
                    document.body.appendChild(script);
                }
            });
        };

        loadLive2DScript()
            .then(() => {
                const live2d = window.OML2D.loadOml2d({
                    primaryColor: '#4589FFFF',
                    mobileDisplay: true,
                    models: [
                        {
                            stageStyle:{
                                marginBottom: '10px',
                                marginLeft: '10px',
                                border: '1px solid #E0E0E0FF',
                                shadow: '0 0 10px rgba(0, 0, 0, 0.05)',
                                borderRadius: '20px',
                                backgroundColor: '#FFFFFF',
                            },
                            path: '/duck_model/duck.model3.json', //test the function right now
                            position: [0,0],
                            scale:0.15,
                            mobileScale:0.15,
                            mobilePosition: [0,0],
                            mobileStageStyle:{
                                marginBottom: '10px',
                                marginLeft: '10px',
                                border: '1px solid #E0E0E0FF',
                                shadow: '0 0 10px rgba(0, 0, 0, 0.05)',
                                borderRadius: '20px',
                                backgroundColor: '#FFFFFF',
                            }
                        }
                    ],
                    statusBar: {
                        mobileStyle: {
                            marginBottom: '100px',
                        },
                        style: {
                            marginBottom: '80px',
                        },
                        restMessage: 'Resting',
                        loadSuccessMessage: 'Ready'
                    },
                    tips: {
                        mobileStyle:{
                            display: 'none',
                        },
                        style: {
                            position: 'fixed',
                            bottom: '300px',
                            display: 'none',
                        }
                    },
                    menus: {
                        mobileStyle: {
                            marginRight: '20px',
                        },
                        style: {
                            marginRight: '20px',
                        },
                        items: [
                            {
                                id: 'Rest',
                                icon: 'icon-rest',
                                title: 'rest',
                                onClick: (oml2d) => {
                                    oml2d.stageSlideOut();
                                    oml2d.setStatusBarClickEvent(
                                        () => {
                                            oml2d.stageSlideIn();
                                            oml2d.statusBarClose('Success');
                                        }
                                    );
                                    oml2d.statusBarOpen('Resting');
                                }
                            }
                        ]
                    },
                    container: '.live2d_container'
                });
            })
            .catch(error => console.error(error));
    }, []);

    
    return (
        <>
          {!isLoggedIn ? null : ( //ensures hooks are called deterministically
            <div className="layout_container">
              <div className="left_column">
                  <DynamicMap location="Nottingham, UK" />
              </div>
              <div className="live2d_container"></div>
              <div className="message_container"></div>
              <div id="chat_container">
                <div id="user_input_area">
                  <TextArea className="chat_textarea" placeholder="Enter your query here." />
                  <Button
                    className="send_button"
                    renderIcon={ArrowRight}
                    onClick={onSubmitClick}
                  />
                </div>
              </div>
              <div className="right_column"></div>
            </div>
          )}
        </>
      );
    }

