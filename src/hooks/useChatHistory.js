import { useState, useCallback } from "react";

/**
 * This hook loads the chat histories from localStorage (by seeing if it starts)
 * with `chatHistory` and then sets the `chatHistories` defined to the loaded
 * chat histories
 * 
 * @returns {function} getHistories - A function that loads the chat histories
 * @returns {Array} chatHistories - An array containing the chat histories
 */
export function useChatHistory() {
    const [chatHistories, setChatHistories] = useState([]);

    const getHistories = useCallback(async () => {
        const histories = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key.startsWith("chatHistory")) {
                const history = JSON.parse(localStorage.getItem(key));

                /* The messageId is used to display the chat history in the UI;
                   similar to ChatGPT */
                // This is Zefei magic btw idk what `history?` and `history?.[0]?` does
                const firstMessage = history?.[0]?.message || "No messages";
                const messageId = firstMessage.length > 30
                    ? firstMessage.substring(0, 30) + "..."
                    : firstMessage;

                histories.push({
                    ...history,
                    key: key.replace("chatHistory", ""),
                    id: messageId
                });
            }
        }

        setChatHistories(histories);
    }, []);

    return {
        chatHistories,
        getHistories
    };
}