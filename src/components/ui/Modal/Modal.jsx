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
        <dialog ref={modalRef} className="m-auto backdrop:bg-black-90 backdrop:backdrop-blur-md rounded-4xl px-rounded-4xl p-5" >
            {props.children}
        </dialog>, document.getElementById('root')
    )
})

export default Modal;
