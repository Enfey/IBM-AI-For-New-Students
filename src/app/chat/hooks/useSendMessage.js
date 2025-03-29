import { useState, useCallback } from "react";

/**
 * Custom hook to send messages to the backend API
 * Removes previous circular dependency between hooks.
 *
 * This hook:
 * * Handles API communication for message sending
 * * Manages loading state during API operations
 * * Provides error handling for failed requests
 *
 * @returns {Object} Message sending methods and state
 * @returns {Function} return.sendMessage - Function to send a message to the API
 * @returns {boolean} return.isSending - Whether a message is currently being sent
 */

export function useSendMessage() {
	const [isSending, setIsSending] = useState(false);

	/**
	 * Forwards a message to the backend API to be processed
	 *
	 * @param {string} message - Message content to send
	 * @param {string} sessionId - ID of the current chat session
	 * @returns {Promise<Object>} API response
	 * @throws {Error} If the API call fails
	 */
	const sendMessage = useCallback(async (message, sessionId) => {
		if (!message.trim() || !sessionId) return; //probably not necessary given early returns in other parts of codebase

		setIsSending(true);
		try {
			const response = await fetch("/api/send_message", {
				method: "POST",
				body: JSON.stringify({
					message,
					session_id: sessionId,
				}),
				headers: { "Content-Type": "application/json" },
			});
			return await response.json();
		} catch (error) {
			console.error("Error sending message:", error);
			throw error;
		} finally {
			setIsSending(false);
		}
	}, []);

	return { sendMessage, isSending };
}
