import React, { useEffect } from "react";
import { marked } from "marked";
import Loading from "@carbon/react/es/components/Loading/Loading";
import { useScrollToBottom } from "../../hooks/useScrollToBottom";

/**
 * Component for message rendering.
 *
 * @param {Object} props - Component props
 * @param {Array} props.messages - Array of messages to render - @see {@link https://react.dev/learn/rendering-lists#why-does-react-need-keys} cannot be used directly for the suggestion buttons to disable specific divs that contain clicked buttons as prop is never placed on DOM node. @todo
 * @param {React.RefObject} props.containerRef - Reference to the message container
 * @returns {JSX.Element} Rendered component
 */
export default function MessageContainer({ messages, containerRef }) {
	const scrollToBottom = useScrollToBottom(containerRef);

	// Scroll to bottom, supplying container ref when messages array change
	useEffect(() => {
		scrollToBottom();
	}, [messages, scrollToBottom]);

	return (
	    <div className="message_container" ref={containerRef}>
			{/* Initial Welcome message */}
			<div className="ai_message_wrapper">
				<img src="/image/duck.png" alt="AI" className="ai_img" />
				<div className="ai_message">
					Hi! I'm your friendly chatbot Nock powered by IBM Watsonx, here to
					help you settle in and make the most of your time at Nottingham.
					Whether you have questions about your course, campus facilities,
					student life, or even the best spots to grab a coffee, I've got you
					covered! ☕️
                    <br />
					Feel free to ask me anything, and if I can't help, I'll guide you to
					someone who can. Let's make your journey at the University of
					Nottingham an amazing one - just say the word, and we'll get started!
					😊
				</div>
			</div>

			{/*Renders messages dynamically based on changes to messages array - 
            if msg.IsUser then style as user, otherwise as AI  
            */}
			{messages.map((msg, index) =>
				msg.isUser ? (
					<div key={index} className="user_message_wrapper">
						<img src="/image/OIP.jpg" alt="User" className="user_img" />
						<div className="user_message">{msg.content}</div>
					</div>
				) : (
					<div key={index} className="ai_message_wrapper">
						<img src="/image/duck.png" alt="AI" className="ai_img" />
						{msg.isLoading ? (
							<div className="ai_message">
								<Loading active={true} description="Loading" /> 
                                ... 
							</div>
						) : (
							<div
								className="ai_message"
								dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) }} // processs with marked
							/>
						)}
					</div>
				)
			)}
		</div>
	);
}
