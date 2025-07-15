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
        <dialog ref={modalRef} className="bg-main m-auto backdrop:bg-main-90 backdrop:backdrop-blur-md rounded-4xl px-rounded-4xl p-5 animate-fade-slide-in" >
            {props.children}
        </dialog>, document.getElementById('root')
    )
})

export default Modal;
