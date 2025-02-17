"use client";

import React, { useEffect } from 'react';
import { ArrowRight } from '@carbon/icons-react';
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

async function onSubmitClick() {
    const textArea = document.querySelector('textarea');

    const response = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify({
            message: textArea.value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    const json = await response.json();
    const userMessage = document.createElement('div');
    userMessage.className = 'message user_message';

    const aiMessage = document.createElement('div');
    aiMessage.className = 'message watson_message';

    let returnMessage;
    switch (json.status) {
        case "success":
            returnMessage = json.text;
            break
        case "error":
            returnMessage = "Sorry, I didn't get that. Could you repeat your message?";
            break;
    }

    userMessage.textContent = textArea.value;
    aiMessage.textContent = returnMessage;

    document.querySelector('.message_container').appendChild(userMessage)
    document.querySelector('.message_container').appendChild(aiMessage);
    textArea.value = '';
}

export default function ChatPage() {

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
                    script.onerror = () => reject(new Error('Live2D 脚本加载失败'));
                    document.body.appendChild(script);
                }
            });
        };

        loadLive2DScript()
            .then(() => {
                const live2d = window.OML2D.loadOml2d({
                    models: [
                        {
                            path: '/duck_model/duck.model3.json', //test the function right now
                            position: [0, -10],
                            scale:0.15,
                        }
                    ],
                    statusBar: {
                        restMessage: 'Resting',
                        loadSuccessMessage: 'Success'
                    },
                    tips: {
                        style: {
                            position: 'fixed',
                            bottom: '300px',
                            display: 'none',
                        }
                    },
                    menus: {
                        styles: {
                            y: '100px !important',
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
        <div className='layout_container'>
            <div className="left_column"></div>

            <div className="live2d_container"></div>

            <div className="message_container"></div>

            <div id="user_input_area">
                <TextArea placeholder="Enter your query." style={{resize: 'none'}}/>
                <Button renderIcon={ArrowRight} onClick={() => onSubmitClick()}>Send</Button>
            </div>

            <div className="right_column"></div>
        </div>
    );
}

