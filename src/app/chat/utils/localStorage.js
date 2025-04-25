/**
 * Saves the chat history to localStorage
 *
 * @param {Array} messages - Array of message objects to save to localStorage -
 * @param {string} sessionId - The current session ID
 */
export function saveMessagesToLocalStorage(messages, sessionId) {
	if (!sessionId) return;

	//transform!
	const history = messages.map((msg) => ({
		content: msg.content,
		isUser: msg.isUser,
		isLoading: msg.isLoading || false
	}));

	localStorage.setItem(`chatHistory${sessionId}`, JSON.stringify(history));
}

/**
 * Retrieves chat history from localStorage
 *
 * @param {string} sessionId - The session ID to retrieve history for
 * @returns {Array} Array of message objects
 */
export function loadMessagesFromLocalStorage(sessionId) {
	if (!sessionId) return [];

	const storedHistory = localStorage.getItem(`chatHistory${sessionId}`);
	if (!storedHistory) return [];

	try {
		const history = JSON.parse(storedHistory);
		return history.map((item) => ({
			content: item.content,
			isUser: item.isUser,
			isLoading: item.isLoading
		}));
	} catch (error) {
		console.error("Error parsing chat history from localStorage:", error);
		return [];
	}
}

/**
 * Does what it says on the tin (deletes chat history from `localStorage`)
 * 
 * @param {string} sessionId - The session ID to delete history for
 */
export function deleteMessagesFromLocalStorage(sessionId) {
	localStorage.removeItem(sessionId);
	
	window.location.href = "/chat";
}
