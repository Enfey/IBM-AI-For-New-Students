/**
 * @fileoverview Contains utility functions for processing messages that don't need access to React features.
 */

/**
 * Processes the API response object and formats the message text
 * to be displayed in the chat window.
 *
 * @param {Object} response - The API response object
 * @returns {string} - The processed message text
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
    
    return message;
  };