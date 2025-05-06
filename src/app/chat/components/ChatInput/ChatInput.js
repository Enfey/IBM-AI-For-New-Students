import { useState } from "react";
import { ArrowRight } from "@carbon/icons-react";
import { TextArea, Button } from "@carbon/react";
import NewSessionModal from "../NewSessionModal/NewSessionModal";

/**
 * ChatInput component for user input and controls.
 *
 * Provides a text input area, submit button, and new session button.
 * Handles keyboard shortcuts like Enter to submit.
 *
 * Uses:
 * - {@link TextArea} from Carbon Design System for text input area
 * - {@link Button} from Carbon Design System for buttons
 * - {@link NewSessionModal} custom component for new session modal
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Function to handle message submission
 * @param {Function} props.onNewSession - Function to handle creating a new session
 * @param {boolean} props.isLoading - Whether a request is in progress
 * @returns {JSX.Element} Rendered ChatInput component
 */
export default function ChatInput({ onSubmit, onNewSession, isLoading }) {
	const [inputText, setInputText] = useState(""); // Small amount of state for input text

	/**
	 * Handles submission of the current message
	 * * Validates input, calls submission callback, and clears input
	 *
	 * @returns {void}
	 */
	const handleSubmit = () => {
		if (inputText.trim() && !isLoading) {
			onSubmit(inputText);
			setInputText("");
		}
	};

	return (
		<div id="chat_container">
            {/* Text area for user input */}
			<div id="user_input_area">
				<TextArea
					className="chat_textarea"
					placeholder="Enter your query here."
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) { // Shift + Enter for new line
							e.preventDefault();
							handleSubmit();
						}
					}}
				/>

                {/* Button group for submit and new session */}
				<div className="button-group">
					<Button
						className="send_button"
						renderIcon={ArrowRight}
						onClick={handleSubmit}
						disabled={isLoading || !inputText.trim()}
                        aria-label="Send message"
					/>
					<NewSessionModal aria-label="Start new session" onNewSession={onNewSession} />
				</div>
			</div>
		</div>
	);
}
