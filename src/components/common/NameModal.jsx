// src/components/common/NameModal.jsx
import React, { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import FormInput from "./FormInput";

const NameModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      onSave(name);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Enter Your Name"
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Enter Your Name</h2>
        <FormInput
          label="Name"
          name="name"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} className="mr-2" ariaLabel="Cancel">
            Cancel
          </Button>
          <Button onClick={handleSave} ariaLabel="Save">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NameModal;
