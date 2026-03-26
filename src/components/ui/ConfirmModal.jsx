import React from "react";
import Modal from "./Modal";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title = "Confirm Deletion", message = "Are you sure you want to delete this?" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p style={{ margin: "0 0 20px 0", color: "#4B5563", fontSize: "14px" }}>
        {message}
      </p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
        <button
          onClick={onClose}
          style={{
            padding: "8px 16px",
            backgroundColor: "#F3F4F6",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            color: "#374151"
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          style={{
            padding: "8px 16px",
            backgroundColor: "#DC2626",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            color: "#ffffff"
          }}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;