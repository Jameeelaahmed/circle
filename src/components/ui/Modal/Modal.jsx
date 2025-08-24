import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal(props, ref) {
  let modalRef = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      modalRef.current?.showModal();
    },
    close: () => {
      modalRef.current?.close();
    },
  }));


  return createPortal(
    <dialog
      ref={modalRef}
      className="bg-gradient-to-b from-bg-primary to-bg-secondary backdrop:bg-main-90 px-rounded-4xl animate-fade-slide-in m-auto rounded-4xl p-5 backdrop:backdrop-blur-md"
    >
      {props.children}
    </dialog>,
    document.getElementById("root"),
  );
});

export default Modal;
