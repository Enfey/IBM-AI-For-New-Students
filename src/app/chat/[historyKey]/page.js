"use client";

import { useParams } from "next/navigation";
import ChatPage from "./page";

/**
 * This is a version of the ChatPage component that is used to display chat
 * history.
 * 
 * It is stored in this directory (chat/[historyKey]/page.js) so that it can
 * leverage next.js dynamic routing, passing the historyKey to fetch from
 * localStorage via the URL
 * 
 * @returns {JSX.Element} Rendered chatPage component, null if not logged in.
 */
export default function ChatHistoryPage() {
    const params = useParams();
    const historyKey = "chatHistory" + params.historyKey;

    return <ChatPage historyKey={historyKey} />;
}