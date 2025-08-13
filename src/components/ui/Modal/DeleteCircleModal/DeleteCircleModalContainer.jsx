import ModalHeading from "../ModalHeading/ModalHeading"
import DeleteCircleModalPresentational from "./DeleteCircleModalPresentational"

function DeleteCircleModalContainer({ onDeleteCircle, closeCircleDeleteModal }) {
    return (
        <>
            <DeleteCircleModalPresentational onDeleteCircle={onDeleteCircle} closeCircleDeleteModal={closeCircleDeleteModal} />
        </>
    )
}

export default DeleteCircleModalContainer
