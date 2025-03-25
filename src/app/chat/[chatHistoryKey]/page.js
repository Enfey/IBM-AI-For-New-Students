"use client";

import { useParams } from 'next/navigation';
import ChatPage from '../page';

/**
 * This is a version of the chat page where previous conversations can be
 * viewed.
 * 
 * About the directory, it's like this (square brackets) because it is
 * using dynamic routing from next.js so that the chat history key can
 * be passed as a parameter from the URL.
 */
export default function ChatHistoryPage() {
    /* Allows us to read what the link's dynamic route is; i.e.
       params.chatHistoryKey returns a string in the format
       chatHistory0x0xxxxx-0x00-0xxx-0000-xx00xx0x000x */
    const params = useParams();
    const historyKey = params.chatHistoryKey;

    /* Calls the ChatPage component but with a historyKey prop so that instead
       of it being used for conversation, it is used to load a previous
       conversation instead */
    return <ChatPage historyKey = {historyKey} />;
}