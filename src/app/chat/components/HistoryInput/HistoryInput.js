import { Button } from "@carbon/react";
import { TrashCan } from "@carbon/icons-react";
import "./history-input.scss";

/**
 * HistoryInput component for managing chat input on history pages.
 *
 * Provides a button to delete chat history.
 *
 * Uses:
 * - {@link Button} from Carbon Design System for button rendering
 * - {@link TrashCan} icon from Carbon Design System for delete icon
 *
 * @param {Object} props - Component props
 * @param {Function} props.onDelete - Function to handle deletion of chat history
 * @returns {JSX.Element} Rendered HistoryInput component
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
                        onClick={onDelete}
                    >
                        Delete chat history
                    </Button>
                </div>
            </div>
        </div>
    )
}