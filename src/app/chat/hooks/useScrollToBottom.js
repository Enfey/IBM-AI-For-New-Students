import { useCallback } from 'react';

/**
 * Custom hook to handle scrolling to bottom of messages - checks if the last message is visible via
 * comparing the last message's offset to container's height.
 * 
 * @param {React.RefObject} containerRef - Reference to the message container
 * @returns {Function} Function to scroll to bottom when needed
 */
export function useScrollToBottom(containerRef) {
  return useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const lastChild = container.lastElementChild;
    if (!lastChild) return;

    const containerHeight = container.clientHeight;
    const lastChildOffset = lastChild.offsetTop - container.scrollTop;

    
    if (lastChildOffset > containerHeight * 0.6) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [containerRef]);
}