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
        }
    }))
    return createPortal(
        <dialog ref={modalRef}>
            {props.children}
        </dialog>, document.getElementById('root')
    )
})

export default Modal;
