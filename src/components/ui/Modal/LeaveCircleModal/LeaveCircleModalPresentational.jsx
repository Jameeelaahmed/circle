import ModalHeading from "../ModalHeading/ModalHeading";

function LeaveCircleModalPresentational({ close, handleLeave, circleName }) {
    return (
        <>
            <ModalHeading title="Leave Circle" onClose={close} />

            <div>
                <div className="text-center mb-4">
                    <p className="text-text">
                        Are you sure you want to leave <span className="font-semibold text-primary">"{circleName}"</span>?
                    </p>
                    <p className="text-text">
                        This action cannot be undone and you will need to be re-invited to join again.
                    </p>
                </div>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={handleLeave}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-text transition-colors"
                    >
                        Leave Circle
                    </button>
                </div>
            </div>
        </>
    );
}

export default LeaveCircleModalPresentational;
