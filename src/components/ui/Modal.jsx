import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button style={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    borderBottom: "1px solid #E5E7EB",
    paddingBottom: "12px",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#6B7280",
  },
  content: {
    marginTop: "16px",
  },
};

export default Modal;
