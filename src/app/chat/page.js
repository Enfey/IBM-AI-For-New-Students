"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import DynamicMap from "../api/google_map/route";

// Import local
import MessageContainer from "./components/MessageContainer/MessageContainer";
import ChatInput from "./components/ChatInput/ChatInput";
import { useScrollToBottom } from "./hooks/useScrollToBottom";
import { useChatSession } from "./hooks/useChatSession";
import { useSendMessage } from "./hooks/useSendMessage";
import { useMessages } from "./hooks/useMessages";
import { setupLive2D } from "./live2DSetup";

/**
 * Main Chat page component
 *
 * Serves as the container for the chat interface.
 * Handles authentication checks and contains the chat UI components.
 * Composes independent hooks to create the complete chat functionality.
 *
 * Uses:
 * @see {@link useAuth} Custom hook for authentication state
 * @see {@link useRouter} From next/navigation for routing
 * @see {@link useChatSession} Custom hook for session management
 * @see {@link useSendMessage} Custom hook for API communication
 * @see {@link useMessages} Custom hook for message state management
 * @see {@link useScrollToBottom} Custom hook for scroll behavior
 * @see {@link setupLive2D} 2d character initialization
 * @see {@link MessageContainer} Component for displaying messages
 * @see {@link ChatInput} Component for user input
 *
 * @returns {JSX.Element} Rendered chatPage component, null if not logged in.
 */
export default function ChatPage() {
    const { isLoggedIn, isInitialised } = useAuth();
    const router = useRouter();
    const messageContainerRef = useRef(null);
    
    // Init hooks
    const { sessionId, isSessionLoading, createSession } = useChatSession();
    const { sendMessage, isSending } = useSendMessage();
    const { messages, isSubmitting, handleSubmit: submitMessage, clearMessages } = 
        useMessages({ sessionId, sendMessage });
    const scrollToBottom = useScrollToBottom(messageContainerRef);
    
    // Wire together
    const isLoading = isSessionLoading || isSending || isSubmitting;

    // Auth check - redirect to / if not logged in
    useEffect(() => {
        if (isInitialised && !isLoggedIn) {
            router.replace("/");
        }
    }, [isInitialised, isLoggedIn, router]);

    // Init my goat
    useEffect(() => {
        setupLive2D();
    }, []);
    
    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, scrollToBottom]);

    // Create a new session if not already present
    // This is a side effect of making the hooks more independent
    useEffect(() => {
        if (isLoggedIn && !sessionId && !isSessionLoading) {
            createSession();
        }
    }, [isLoggedIn, sessionId, isSessionLoading, createSession]);
    
    /**
     * Handle new user message submission
     * Delegates to the useMessages hook's handler
     * 
     * @param {string} text - User message text
     * @returns {Promise<void>}
     */
    const handleSubmit = useCallback((text) => {
        return submitMessage(text);
    }, [submitMessage]);
    
    /**
     * Handle new session creation
     * Creates a new session and clears messages
     * 
     * @returns {Promise<void>}
     */
    const handleNewSession = useCallback(async () => {
        await createSession();
        clearMessages();
    }, [createSession, clearMessages]);

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