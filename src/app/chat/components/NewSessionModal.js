import React, { useState } from 'react';
import { Add } from '@carbon/icons-react';
import { Button, ComposedModal, ModalFooter, ModalBody } from '@carbon/react';

/**
 * Modal component for creating a new chat session
 * @param {Object} props - Component props
 * @param {Function} props.onNewSession - Callback for when a new session is created
 * @returns {JSX.Element} The rendered component
 */
export default function NewSessionModal({ onNewSession }) {
  const [open, setOpen] = useState(false);
  
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
      <Button onClick={() => setOpen(true)} className="send_button" renderIcon={Add}></Button>

      <ComposedModal
        size="xs"
        open={open}
        onRequestClose={() => setOpen(false)}
        preventCloseOnClickOutside={true}
      >
        <ModalBody>
          <h3>Create a new session</h3>
          <br/>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
            <p>This behaviour will stop the current session and create a new one. Are you sure you want to continue?</p>
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