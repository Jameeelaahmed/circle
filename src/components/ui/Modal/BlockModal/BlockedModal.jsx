import React, { forwardRef } from "react";
import Modal from "../Modal";

const BlockedModal = forwardRef((props, ref) => {
  const handleClose = () => {
    ref.current?.close();
    if (props.onConfirm) props.onConfirm();
  };

  return (
    <Modal ref={ref}>
      <div className="flex flex-col items-center p-6 bg-[var(--color-glass)] rounded-[var(--rounded-rounded)] shadow-[var(--shadow-glassCard)] max-w-sm mx-auto text-[var(--color-text)] font-sans select-none">
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-primary)" }}>
          Account Blocked
        </h2>
        <p className="mb-6 text-center text-text font-light" style={{ fontFamily: "var(--font-primary)" }}>
          Your account has been blocked by admin.
        </p>
        <button
          onClick={handleClose}
          className="px-6 py-2 bg-[var(--color-accent)] rounded-[var(--rounded-pill)] text-text font-semibold shadow-[var(--shadow-btnPrimary)] hover:shadow-[var(--shadow-btnPrimaryHover)] transition-shadow duration-300 cursor-pointer"
          style={{ fontFamily: "var(--font-primary)" }}
          autoFocus
        >
          OK
        </button>
      </div>
    </Modal>
  );
});

export default BlockedModal;
