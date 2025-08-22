import ModalHeading from "../ModalHeading/ModalHeading";

function ClearChatModalPresentational({ close, handleClear, chatName }) {
    return (
        <>
            <ModalHeading title="Clear Chat" onClose={close} />
            <div className="p-4">
                <p className="text-text mb-6 text-center">
                    Are you sure you want to clear all messages in <span className="font-semibold text-primary">"{chatName}"</span>?
                </p>
                <p className="text-text mb-6 text-center">
                    This action cannot be undone.
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 rounded-lg bg-lg bg-red-500 text-text transition-colors"
                    >
                        Clear Chat
                    </button>
                </div>
            </div >
        </>
    );
}

export default ClearChatModalPresentational;
