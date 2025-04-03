import { Button } from "@carbon/react";
import { TrashCan } from "@carbon/icons-react";

/**
 * Shamelessly stolen from ChatInput.js (sorry Felix)
 * 
 * @param {Function} onDelete (function to handle deletion of chat history)
 * @returns {JSX.Element} Rendered component
 */
export default function HistoryInput({ onDelete }) {
    return (
        <div id="chat_container">
            <div id="user_input_area">
                <div className="button-group">
                    <Button
                        kind="danger"
                        renderIcon={TrashCan}
                        onClick = {onDelete}
                    >
                        Delete chat history
                    </Button>
                </div>
            </div>
        </div>
    )
}