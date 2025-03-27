import { useState, useCallback } from "react";
import { useMessages } from "./useMessages";

/**
 * Custom hook to manage chat sessions and integrate with message handling
 *
 * This hook:
 * - Creates and manages chat sessions with the backend
 * - Sends messages to the backend API
 * - Integrates with useMessages for message state management
 * - Handles loading states during API operations
 *
 * @returns {Object} Session management methods and state
 * @returns {string|null} return.sessionId - Current session ID or null if no active session
 * @returns {boolean} return.isLoading - Whether any API operations are in progress
 * @returns {Array} return.messages - Array of chat messages in the current session
 * @returns {Function} return.handleSubmit - Function to handle submission of new user message
 * @returns {Function} return.handleNewSession - Function to create a new chat session
 */
export function useChatSession() {
	const [sessionId, setSessionId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * Creates a new chat session
	 * Makes a request to /api/create_session endpoint and stores the returned session id
	 * Sets loading state during the request via loading state hook
	 *
	 * @returns {Promise<string>} The new session ID
	 * @throws {Error} If the session creation fails
	 */
	const createSession = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/create_session");
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
	 * Creates a new session first if one doesn't exist
	 * Sets loading state during the API request
	 *
	 * @param {string} message - User's message text to send to backend
	 * @returns {Promise<Object>} The response from the API
     * @throws {Error} If the message sending fails or if session creation fails. 
	 */
	const sendMessage = useCallback(
		async (message) => {
			setIsLoading(true);

			let currentSessionId = sessionId;

			if (!currentSessionId) {
				currentSessionId = await createSession();
			}

			try {
				const response = await fetch("/api/send_message", {
					method: "POST",
					body: JSON.stringify({
						message,
						session_id: currentSessionId,
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				});
				return await response.json();
			} catch (error) {
				console.error("Error sending message:", error);
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[sessionId, createSession]
	);

	// Use messages hook to handle message state
	const { messages, isSubmitting, handleSubmit, clearMessages } = useMessages({
		sessionId,
		sendMessage,
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
		handleNewSession,
	};
}
