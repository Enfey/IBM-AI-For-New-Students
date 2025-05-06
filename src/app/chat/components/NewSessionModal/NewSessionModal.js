import { useState } from "react";
import { Add } from "@carbon/icons-react";
import { Button, ComposedModal, ModalFooter, ModalBody } from "@carbon/react";

/**
 * Modal component for creating a new chat session
 * * Displays confirmation dialog before starting a new session
 * * Handles submission and cancellation actions
 * 
 * * Uses(All from Carbon Design System):
 * * - {@link ComposedModal} from for modal rendering
 * * - {@link ModalBody} and {@link ModalFooter} for modal content and actions
 * * - {@link Button} for triggering the modal and submitting actions
 * * - {@link Add} icon for the button
 * 
 *
 * @param {Object} props - Component props
 * @param {Function} props.onNewSession - Callback for creation of new session.
 * @returns {JSX.Element} The rendered component
 */
export default function NewSessionModal({ onNewSession }) {
    const [open, setOpen] = useState(false);

    /**
     * Handles the submission of the new session request
     * * Calls onNewSession and closes the modal
     * * Handles any errors that occur during session creation
     *
     * @returns {Promise<void>}
     * @throws {Error} if session failed to create
     */
    const handleSubmit = async () => {
        try {
            await onNewSession();
            setOpen(false);
        } catch (error) {
            console.error("Error in newSession:", error);
        }
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="send_button"
                renderIcon={Add}
            ></Button>

            <ComposedModal
                size="xs"
                open={open}
                onRequestClose={() => setOpen(false)}
                preventCloseOnClickOutside={true}
            >
                <ModalBody>
                    <h3>Create a new session</h3>
                    <br />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <p>
                            This behaviour will stop the current session and
                            create a new one. Are you sure you want to continue?
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter
                    danger
                    primaryButtonText="OK"
                    secondaryButtonText="Cancel"
                    onRequestClose={() => setOpen(false)}
                    onRequestSubmit={handleSubmit}
                />
            </ComposedModal>
        </>
    );
}
