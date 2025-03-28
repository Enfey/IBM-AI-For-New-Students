import { useState, useCallback } from "react";

/**
 * Custom hook to manage chat sessions
 *
 * This hook:
 * - Creates and manages chat sessions with the backend
 * - Handles loading states during session creation
 *
 * @returns {Object} Session management methods and state
 * @returns {string|null} return.sessionId - Current session ID or null if no active session
 * @returns {boolean} return.isLoading - Whether session creation is in progress
 * @returns {Function} return.createSession - Function to create a new chat session
 */
export function useChatSession() {
	const [sessionId, setSessionId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * Creates a new chat session
	 * Makes a request to /api/create_session endpoint and stores the returned session id
	 * Sets loading state during the request
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

	return {
		sessionId,
		isLoading,
		createSession,
	};
}
