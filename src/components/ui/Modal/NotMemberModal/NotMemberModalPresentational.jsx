import ModalHeading from "../ModalHeading/ModalHeading";

function NotMemberModalPresentational({ handleJoinRequest, onClose, circle, isRequestPending }) {
    return (
        <div>
            <ModalHeading title="Join Circle" onClose={onClose} />
            <p className="text-center mb-6">
                You need to join this circle to send messages and interact with members.
            </p>

            <div className="flex justify-end">
                {isRequestPending ? (
                    <span className="px-5 py-2 rounded-lg font-semibold mb-2 text-primary">
                        Request Sent
                    </span>
                ) : (
                    <button
                        onClick={(e) => handleJoinRequest(circle.id, e)}
                        className="bg-primary cursor-pointer px-5 py-2 rounded-lg font-semibold transition mb-2"
                    >
                        Join Circle
                    </button>
                )}
            </div>
        </div>
    );
}

export default NotMemberModalPresentational;
