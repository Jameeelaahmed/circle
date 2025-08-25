import { useRef, forwardRef, useImperativeHandle, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Modal = forwardRef(function Modal(props, ref) {
  let modalRef = useRef();

  const { darkMode } = useContext(ThemeContext);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

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
      className={`${darkMode ? "light" : ""}bg-gradient-to-b from-bg-primary to-bg-secondary backdrop:bg-main-90 px-rounded-4xl animate-fade-slide-in m-auto rounded-4xl p-5 backdrop:backdrop-blur-md`}
    >
      {props.children}
    </dialog>,

    document.getElementById("root"),
  );
});

export default Modal;
