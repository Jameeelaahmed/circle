import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal(props, ref) {
  let modalRef = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      modalRef.current.showModal();
    },
    close: () => {
      modalRef.current.close();
    },
  }));

  const handleCancel = (e) => {
    e.preventDefault();
    modalRef.current.close();
    if (props.onClose) props.onClose();
  };

  return createPortal(
    <dialog
      ref={modalRef}
      className="bg-main backdrop:bg-main-90 px-rounded-4xl animate-fade-slide-in m-auto rounded-4xl p-5 backdrop:backdrop-blur-md"
      onCancel={handleCancel}
      modal="true"
    >
      {props.children}
    </dialog>,
    document.getElementById("root"),
  );
});

export default Modal;
