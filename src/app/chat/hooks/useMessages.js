import { useState, useCallback } from "react";
import { saveMessagesToLocalStorage } from "../utils/localStorage";
import { processResponse } from "../utils/messages";

/**
 * Custom hook for managing chat messages and operations
 *
 * This hook encapsulates all message-related state and actions including:
 * * Maintaining message state
 * * Adding user messages
 * * Processing API responses
 * * Handling errors
 * * Persisting messages to localStorage
 *
 * @see {@link ../utils/message.js} for handling message processing which don't need React features
 *
 * @param {Object} options - Configuration options
 * @param {Function} options.sendMessage - Function to send messages to the API
 * @returns {{messages: *[], isSubmitting: boolean, handleSubmit: ((function(*): Promise<void>)|*), clearMessages: ((function(): void)|*), location: string}} Message state and operations
 * @returns {Array} return.messages - Array of chat messages
 * @returns {boolean} return.isSubmitting - Whether a message is currently being submitted
 * @returns {Function} return.handleSubmit - Function to handle new message submission
 * @returns {Function} return.clearMessages - Function to clear all messages
 * @returns {*} return.location - searching location of user
 */
export function useMessages({ sendMessage }) {
	const [messages, setMessages] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [location, setLocation] = useState("Nottingham, UK");

	/**
	 * Clear all messages from state and localStorage,
	 * used when starting a new chat session
	 *
	 * @returns {void}
	 */
	const clearMessages = useCallback(() => {
		setMessages([]);
		saveMessagesToLocalStorage([], localStorage.getItem("chat_session_id"));
	}, [localStorage.getItem("chat_session_id")]); // clear messages when session ID changes

	/**
	 * Persists messages to state and localStorage
	 *
	 * @param {Array} messages - Array of messages to persist
	 * @returns {void}
	 */
	const persistMessages = useCallback(
		(messages) => {
			setMessages(messages);
			saveMessagesToLocalStorage(messages, localStorage.getItem("chat_session_id"));
		},
		[localStorage.getItem("chat_session_id")]
	);

	/**
	 * Handle message submission and processing
	 * * Adds user message to state, sends to API via 'sendMessage' and processes response via 'processResponse'
	 * * Updates message state accordingly.
	 *
	 * @param {string} text - User message text
	 * @returns {Promise<void>}
	 */
	const handleSubmit = useCallback(
		async (text) => {
			if (!text.trim() || isSubmitting) return;

			setIsSubmitting(true);

			// create new messages array with prev messages, user message, and placeholder loading message
			const updatedMessages = [
				...messages,
				{ content: text, isUser: true },
				{ content: "", isUser: false, isLoading: true },
			];
			setMessages(updatedMessages);

			try {
				// send to API and process response
				const response = await sendMessage(text, localStorage.getItem("chat_session_id"));
				const processedContent = processResponse(response).message;
				const processedLocation = processResponse(response).location;

				// Set location
				setLocation(processedLocation);

				// Update messages with processed response
				const finalMessages = [
					...updatedMessages.slice(0, -1), // remove loading message
					{ content: processedContent, isUser: false },
				];

				persistMessages(finalMessages);
			} catch (error) {
				console.error("Error sending message:", error);

				// Add error message
				const finalMessages = [
					...updatedMessages.slice(0, -1), // remove loading message
					{
						content: "Sorry, there was an error processing your request.",
						isUser: false,
					},
				];
				persistMessages(finalMessages);
			} finally {
				setIsSubmitting(false);
			}
		},
		[messages, sendMessage, localStorage.getItem("chat_session_id"), isSubmitting, persistMessages, location]
	);

	return {
		messages,
		isSubmitting,
		handleSubmit,
		clearMessages,
		location
	};
}
