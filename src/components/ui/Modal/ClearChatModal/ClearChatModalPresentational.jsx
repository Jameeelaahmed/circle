import ModalHeading from "../ModalHeading/ModalHeading";

function ClearChatModalPresentational({ close, handleClear }) {
    return (
        <>
            <ModalHeading title="Clear Chat" onClose={close} />
            <div className="p-4">
                <p className="text-white mb-6 text-center">
                    Are you sure you want to clear all messages in this chat for yourself?
                </p>
                <p className="text-white mb-6 text-center">
                    This action cannot be undone.
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 rounded-lg bg-accent hover:bg-accent/80 text-white transition-colors"
                    >
                        Clear Chat
                    </button>
                </div>
            </div >
        </>
    );
}

export default ClearChatModalPresentational;
