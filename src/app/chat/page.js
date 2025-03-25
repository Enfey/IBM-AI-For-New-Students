"use client";

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import DynamicMap from '../api/google_map/route';

// import local
import MessageContainer from './components/MessageContainer';
import ChatInput from './components/ChatInput';
import { useChatSession } from './hooks/useChatSession';
import { setupLive2D } from './live2DSetup';

/**
 * Main Chat page component - refer to here to if confused about the flow of state throughout this component(s) parts.
 * 
 * This component serves as the container for the chat interface.
 * It handles authentication checks and contains the chat UI components.
 * All message handling logic is delegated to custom hooks for better separation of concerns.
 * 
 * Uses:
 * @see {@link useAuth} custom hook for authentication state
 * @see {@link useRouter} from next/navigation for routing
 * @see {@link useChatSession} custom hook for session and message management
 * @see {@link setupLive2D} 2d character initialisation 
 * @see {@link MessageContainer} component for displaying messages
 * @see {@link ChatInput} component for user input
 * 
 * @returns {JSX.Element} Rendered chatPage component
 */
export default function ChatPage() {
  const { isLoggedIn, isInitialised } = useAuth();
  const router = useRouter();
  const messageContainerRef = useRef(null);
  
  // Grab methods and state from hook
  const { 
    messages, 
    isLoading, 
    handleSubmit, 
    handleNewSession 
  } = useChatSession();

  // Auth check - redirect to / if not logged in
  useEffect(() => {
    if (isInitialised && !isLoggedIn) {
      router.replace('/');
    }
  }, [isInitialised, isLoggedIn, router]); // Info: dependency array, re-run effect when these values change

  // Init my goat
  useEffect(() => {
    setupLive2D();
  }, []);

  //Conditional render based on login state
  if (!isLoggedIn) return null;

  return (
    <div className="layout_container">
      <div className="left_column">
        <DynamicMap location="Nottingham, UK" />
      </div>
      <div className="live2d_container"></div>
      
      <MessageContainer 
        messages={messages}
        containerRef={messageContainerRef}
      />
      
      <ChatInput 
        onSubmit={handleSubmit}
        onNewSession={handleNewSession}
        isLoading={isLoading}
      />
      
      <div className="right_column"></div>
    </div>
  );
}