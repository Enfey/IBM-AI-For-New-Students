import { useCallback } from "react";

/**
 * Custom hook to handle scrolling to bottom of messages
 * * Checks if the last message is visible by comparing offset to container's height
 * * Automatically scrolls to new messages when they're outside the visible area
 *
 * @param {React.RefObject} containerRef - Reference to the message container element
 * @returns {Function} Function to trigger scrolling to bottom
 */
export function useScrollToBottom(containerRef) {
	return useCallback(() => {
		if (!containerRef.current) return; 

		const container = containerRef.current;
		const lastChild = container.lastElementChild;
		if (!lastChild) return;

		const containerHeight = container.clientHeight;
		const lastChildOffset = lastChild.offsetTop - container.scrollTop; // Calculate the offset of the last child from the top of the container

        {/* Check if the last child offset is greater than 60% of the container height, i.e., closer to offscreen than on */}
		if (lastChildOffset > containerHeight * 0.6) {
			setTimeout(() => {
				window.scrollTo({
					top: document.documentElement.scrollHeight,
					behavior: "smooth",
				});
			}, 100); // Delay 
		}
	}, [containerRef]);
}
