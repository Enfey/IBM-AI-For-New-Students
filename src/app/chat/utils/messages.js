/**
 * Utility function to process API response for chat messages
 * * Processes the raw API response into a format suitable for display
 * * Handles different response formats and extracts the message content
 *
 * @param {Object} response - Raw response from the message API
 * @returns {{message: string, location: string}} Processed message content ready for display
 */
export const processResponse = (response) => {
	let message = "Sorry, something went wrong; please try again.";

	if (response.status === "INPUT_SUCCESS") {
		if (response.suggestions && response.suggestions.length > 0) {
			message = "Suggestions: \n" + response.suggestions.join(", ");
		} else {
			message = response.texts + "\n" + response.options;
		}
	} else if (response.status === "INPUT_FAIL") {
		message = "Sorry, I didn't get that. Could you repeat your message again?";
	}

	// Get location
	const location = response.location;

	//return message and location
	return { message, location };
};
