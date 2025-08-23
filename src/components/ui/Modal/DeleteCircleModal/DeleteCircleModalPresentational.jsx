import ModalHeading from "../ModalHeading/ModalHeading";

function DeleteCircleModalPresentational({ onDeleteCircle, closeCircleDeleteModal, isDeleting, circleName }) {
    return (
        <>
            <ModalHeading title="Delete Circle" onClose={closeCircleDeleteModal} />
            <div>
                <div className="text-center mb-4">
                    <p className="text-text">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-primary">"{circleName}"</span>?
                    </p>
                    <p className="text-text">
                        <span className="font-semibold text-red-500">This action cannot be undone.</span>
                    </p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onDeleteCircle}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-text transition-colors"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete Circle"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeleteCircleModalPresentational;
