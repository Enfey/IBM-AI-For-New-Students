"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import DynamicMap from "../api/google_map/route";

// Import local
import MessageContainer from "./components/MessageContainer/MessageContainer";
import ChatInput from "./components/ChatInput/ChatInput";
import HistoryInput from "./components/HistoryInput/HistoryInput";
import { useScrollToBottom } from "./hooks/useScrollToBottom";
import { useChatSession } from "./hooks/useChatSession";
import { useSendMessage } from "./hooks/useSendMessage";
import { useMessages } from "./hooks/useMessages";
import { deleteMessagesFromLocalStorage } from "./utils/localStorage";
import { setupLive2D } from "./live2dsetup";
import withAuth from "@/components/AuthBlock/AuthBlock";

/**
 * Main Chat page component
 *
 * Serves as the container for the chat interface.
 * Handles authentication checks and contains the chat UI components.
 * Composes independent hooks to create the complete chat functionality.
 *
 * Uses:
 * @see {@link withAuth} Custom auth HOC for delegating authentication checks for pages
 * @see {@link useRouter} From next/navigation for routing
 * @see {@link useChatSession} Custom hook for session management
 * @see {@link useSendMessage} Custom hook for API communication
 * @see {@link useMessages} Custom hook for message state management
 * @see {@link useScrollToBottom} Custom hook for scroll behavior
 * @see {@link setupLive2D} Live2d character initialisation
 * @see {@link MessageContainer} Component for displaying messages
 * @see {@link ChatInput} Component for user input
 * 
 * @param {Object} props - Component props
 * @param {props.historyKey} historyKey - Optional key for loading previous chat history from localStorage
 *
 * @returns {JSX.Element||null} Rendered chatPage component, null if not logged in
 */
function ChatPage({ historyKey = null }) {
    const messageContainerRef = useRef(null);

    // Init hooks
    const { isSessionLoading, createSession } = useChatSession();
    const { sendMessage, isSending } = useSendMessage();
    const {
        messages,
        isSubmitting,
        handleSubmit: submitMessage,
        clearMessages,
        location,
    } = useMessages({ sendMessage });
    const scrollToBottom = useScrollToBottom(messageContainerRef);

    // Wire together
    const isLoading = isSessionLoading || isSending || isSubmitting;

    // Initialise duck
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
        if (!isSessionLoading) {
            createSession();
        }
    }, [isSessionLoading, createSession]);

    /**
     * Handle new user message submission
     * * Delegates to the useMessages hook's handler
     *
     * @param {string} text - User message text
     * @returns {Promise<void>}
     */
    const handleSubmit = useCallback(
        (text) => {
            return submitMessage(text);
        },
        [submitMessage]
    );

    /**
     * Handle new session creation
     * * Refreshes the page to create a new session
     *
     * @returns {Promise<void>}
     */
    const handleNewSession = useCallback(async () => {
        window.location.reload();
    }, []);

    // Check if a historyKey has been passed (if a previous chat should be displayed)
    const isHistory = historyKey !== null;

    return (
        <div className="layout_container">
            <div className="left_column"></div>
            <DynamicMap location={location} />

            {/* If viewing a chat history (not new messages), then display the
			    previous messages from `localStorage` and then display a button
				that gives the user the option to delete the given chat history */}
            {isHistory ? (
                <>
                    <MessageContainer
                        messages={JSON.parse(localStorage.getItem(historyKey))}
                        containerRef={messageContainerRef}
                    />
                    ,
                    <HistoryInput
                        onDelete={() => {
                            deleteMessagesFromLocalStorage(historyKey);
                        }}
                    ></HistoryInput>
                </>
            ) : (
                ({
                    /* Otherwise, display the usual display for talking with the chatbot
			    (text area, submit button, new session button, etc.) and any
				messages sent from the user or chatbot */
                },
                (
                    <>
                        <MessageContainer
                            messages={messages}
                            containerRef={messageContainerRef}
                        />
                        ,
                        <ChatInput
                            onSubmit={handleSubmit}
                            onNewSession={handleNewSession}
                            isLoading={isLoading}
                        />
                    </>
                ))
            )}

            <div className="right_column"></div>
        </div>
    );
}

export default withAuth(ChatPage);
