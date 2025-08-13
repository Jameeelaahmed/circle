import ModalHeading from "../ModalHeading/ModalHeading";
import { AlertTriangle } from "lucide-react";

function DeleteCircleModalPresentational({ onDeleteCircle, closeCircleDeleteModal }) {
    return (
        <>
            <ModalHeading title="Delete Circle" onClose={closeCircleDeleteModal} />
            <div className="p-6 text-center">
                <div className="flex flex-col items-center justify-center mb-4">
                    <AlertTriangle className="text-red-500 mb-2" size={40} />
                    <h2 className="text-xl font-bold text-red-600 mb-2">Delete Circle?</h2>
                </div>
                <p className="mb-6 text-base text-text">
                    Are you sure you want to delete this circle? <br />
                    <span className="font-semibold text-red-500">This action cannot be undone.</span>
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        className="px-5 py-2 rounded bg-red-500 text-text font-semibold hover:bg-red-600 transition"
                        onClick={onDeleteCircle}
                    >
                        Delete
                    </button>
                    <button
                        className="px-5 py-2 rounded bg-gray-100 text-text font-semibold hover:bg-text transition"
                        onClick={closeCircleDeleteModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeleteCircleModalPresentational;
