import { useState, useCallback } from 'react';
import { useMessages } from './useMessages';

/**
 * Custom hook to manage chat sessions and integrate with message handling
 * 
 * This hook:
 * - Creates and manages chat sessions with the backend
 * - Sends messages to the backend API
 * - Integrates with useMessages for message state management
 * 
 * @returns {Object} Session management methods and state
 */
export function useChatSession() {
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Creates a new chat session
   * @returns {Promise<string>} The new session ID
   */
  const createSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/create_session');
      const data = await response.json();
      setSessionId(data.payload);
      return data.payload;
    } catch (error) {
      console.error("Error creating session:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Sends a message to the backend API
   * @param {string} message - User's message text
   * @returns {Promise<Object>} The response from the API
   */
  const sendMessage = useCallback(async (message) => {
    setIsLoading(true);
    
    let currentSessionId = sessionId;
    
    if (!currentSessionId) {
      currentSessionId = await createSession();
    }
    
    try {
      const response = await fetch('/api/send_message', {
        method: 'POST',
        body: JSON.stringify({
          message,
          session_id: currentSessionId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      return await response.json();
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, createSession]);

  // Use messages hook to handle message state
  const { 
    messages, 
    isSubmitting,
    handleSubmit, 
    clearMessages 
  } = useMessages({ 
    sessionId, 
    sendMessage 
  });

  /**
   * Creates a new chat session and clears messages
   */
  const handleNewSession = useCallback(async () => {
    await createSession();
    clearMessages();
  }, [createSession, clearMessages]);

  return {
    sessionId,
    isLoading: isLoading || isSubmitting,
    messages,
    handleSubmit,
    handleNewSession
  };
}