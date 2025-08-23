import ModalHeading from "../ModalHeading/ModalHeading";
import { AlertTriangle } from "lucide-react";

function DeleteCircleModalPresentational({ onDeleteCircle, closeCircleDeleteModal, isDeleting, circleName }) {
    return (
        <>
            <ModalHeading title="Delete Circle" onClose={closeCircleDeleteModal} />
            <div className="p-6 text-center">
                <div className="flex flex-col items-center justify-center mb-4">
                    <AlertTriangle className="text-red-500 mb-3 animate-pulse" size={44} />
                    <h2 className="text-2xl font-extrabold text-red-600">Delete Circle?</h2>
                </div>

                <p className="mb-6 text-base text-gray-600 leading-relaxed">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-primary">{circleName}</span>? <br />
                    <span className="font-semibold text-red-500">This action cannot be undone.</span>
                </p>

                <div className="flex justify-center gap-3">
                    <button
                        className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-300 disabled:opacity-60 transition-all"
                        onClick={onDeleteCircle}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                    <button
                        className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 disabled:opacity-60 transition-all"
                        onClick={closeCircleDeleteModal}
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeleteCircleModalPresentational;
