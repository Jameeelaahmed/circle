import ModalHeading from "../ModalHeading/ModalHeading";

function LeaveCircleModalPresentational({ close, handleLeave, circleName }) {
    return (
        <>
            <ModalHeading title="Leave Circle" onClose={close} />

            <div className="p-4">
                <p className="text-white mb-6">
                    Are you sure you want to leave <span className="font-semibold text-primary">"{circleName}"</span>?
                    {" "}If you are an admin, admin privileges will be randomly transferred to another member.
                    This action cannot be undone and you will need to be re-invited to join again.
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={close}
                        className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLeave}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                    >
                        Leave Circle
                    </button>
                </div>
            </div>
        </>
    );
}

export default LeaveCircleModalPresentational;
