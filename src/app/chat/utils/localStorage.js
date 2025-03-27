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
		message: msg.content,
		isUser: msg.isUser,
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
			content: item.message,
			isUser: item.isUser,
		}));
	} catch (error) {
		console.error("Error parsing chat history from localStorage:", error);
		return [];
	}
}
