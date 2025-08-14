import ModalHeading from "../ModalHeading/ModalHeading"
import DeleteCircleModalPresentational from "./DeleteCircleModalPresentational"

function DeleteCircleModalContainer({ onDeleteCircle, closeCircleDeleteModal, isDeleting, circleName }) {
    return (
        <>
            <DeleteCircleModalPresentational onDeleteCircle={onDeleteCircle} closeCircleDeleteModal={closeCircleDeleteModal} isDeleting={isDeleting} circleName={circleName} />
        </>
    )
}

export default DeleteCircleModalContainer
