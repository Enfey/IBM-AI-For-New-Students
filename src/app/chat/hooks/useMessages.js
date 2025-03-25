import { useState, useCallback } from 'react';
import { saveMessagesToLocalStorage } from '../utils/localStorage';
import { processResponse } from '../utils/messages';

/**
 * Custom hook for managing chat messages and operations
 * 
 * This hook encapsulates all message-related state and actions including:
 * - Maintaining message state
 * - Adding user messages
 * - Processing API responses
 * - Handling errors
 * - Persisting messages to localStorage
 * 
 * @see {@link ../utils/message.js} for handling message processing which don't need React features
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.sessionId - Current chat session ID
 * @param {Function} options.sendMessage - Function to send messages to the API
 * @returns {Object} Message state and operations
 */
export function useMessages({ sessionId, sendMessage }) {
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /**
   * Clear all messages (for new sessions)
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    saveMessagesToLocalStorage([], sessionId);
  }, [sessionId]); // clear messages when session ID changes

    /**
     * Persists messages to state and localStorage
     *  
     * @param {Array} messages - Array of message objects to persist
     * @returns {void}
     * */
  const persistMessages = useCallback((messages) => {
    setMessages(messages);
    saveMessagesToLocalStorage(messages, sessionId);
  } , [sessionId]);
  
  /**
   * Handle message submission and processing
   * 
   * @param {string} text - User message text
   * @returns {Promise<void>}
   */
  const handleSubmit = useCallback(async (text) => {
    if (!text.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // create new messages array with prev messages, user message, and placeholder loading message
    const updatedMessages = [
      ...messages,
      { content: text, isUser: true },
      { content: '', isUser: false, isLoading: true }
    ];
    setMessages(updatedMessages);
    
    try {
      // send to API and process response
      const response = await sendMessage(text);
      const processedContent = processResponse(response);
      
      // Update messages with processed response
      const finalMessages = [
        ...updatedMessages.slice(0, -1), // remove loading message
        { content: processedContent, isUser: false }
      ];
      
      persistMessages(finalMessages);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      const finalMessages = [
        ...updatedMessages.slice(0, -1), // remove loading message
        { content: "Sorry, there was an error processing your request.", isUser: false }
      ];
      
      persistMessages(finalMessages);
    } finally {
      setIsSubmitting(false);
    }
  }, [messages, sendMessage, sessionId, isSubmitting]); 
  
  return {
    messages,
    isSubmitting,
    handleSubmit,
    clearMessages
  };
}