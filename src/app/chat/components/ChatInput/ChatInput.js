import React, { useState } from "react";
import { ArrowRight } from "@carbon/icons-react";
import { TextArea, Button } from "@carbon/react";
import NewSessionModal from "../NewSessionModal/NewSessionModal";

/**
 * Component for user input and controls
 * Provides text input area, submit button and new session button
 * Handles keyboard shortcuts like Enter to submit
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Function to handle message submission
 * @param {Function} props.onNewSession - Function to handle creating a new session
 * @param {boolean} props.isLoading - Whether a request is in progress
 * @returns {JSX.Element} Rendered component
 */
export default function ChatInput({ onSubmit, onNewSession, isLoading }) {
	const [inputText, setInputText] = useState(""); // react state for input text

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
			<div id="user_input_area">
				<TextArea
					className="chat_textarea"
					placeholder="Enter your query here." /**broken on dark mode @todo fix! */
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSubmit();
						}
					}}
				/>

				<div className="button-group">
					<Button
						className="send_button"
						renderIcon={ArrowRight}
						onClick={handleSubmit}
						disabled={isLoading || !inputText.trim()}
					/>
					<NewSessionModal onNewSession={onNewSession} />
				</div>
			</div>
		</div>
	);
}
