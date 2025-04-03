import { Button } from "@carbon/react";
import { TrashCan } from "@carbon/icons-react";
import "./history-input.scss";

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
                <div className={"delete_container"} align="center">
                    <Button
                        className={"delete_button"}
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