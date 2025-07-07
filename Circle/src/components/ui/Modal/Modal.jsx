import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal(_, ref) {
    let modalRef = useRef();
    useImperativeHandle(ref, () => ({
        open: () => {
            modalRef.current.showModal();
        },
        close: () => {
            modalRef.current.close();
        }
    }))
    return (
        <dialog ref={modalRef}>
            {/* children */}
        </dialog>
    ), createPortal('root')
})

export default Modal;
