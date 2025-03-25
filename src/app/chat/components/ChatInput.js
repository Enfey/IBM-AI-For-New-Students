import React, { useState } from 'react';
import { ArrowRight } from '@carbon/icons-react';
import { TextArea, Button } from '@carbon/react';
import NewSessionModal from './NewSessionModal';

/**
 * Component for user input and controls
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Function to handle message submission
 * @param {Function} props.onNewSession - Function to handle creating a new session
 * @param {boolean} props.isLoading - Whether a request is in progress
 * 
 * @returns {JSX.Element} Rendered component
 */
export default function ChatInput({ onSubmit, onNewSession, isLoading }) {
  const [inputText, setInputText] = useState(""); // react state for input text

  const handleSubmit = () => {
    if (inputText.trim() && !isLoading) {
      onSubmit(inputText);
      setInputText("");
    }
  };

  return (
    <div id="chat_container">
      <div id="user_input_area">
        <TextArea
          className="chat_textarea"
          placeholder="Enter your query here."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        <div className="button-group">
          <Button 
            className="send_button" 
            renderIcon={ArrowRight} 
            onClick={handleSubmit}
            disabled={isLoading || !inputText.trim()}
          />
          <NewSessionModal onNewSession={onNewSession} />
        </div>
      </div>
    </div>
  );
}