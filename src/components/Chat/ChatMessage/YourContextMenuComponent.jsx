import React from "react";

export default function YourContextMenuComponent({ message, onClose }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
            onClick={onClose}
        >
            <div
                className="bg-main rounded-t-2xl shadow-lg w-full max-w-sm mx-auto p-4"
                onClick={e => e.stopPropagation()}
            >
                <div className="mb-4 text-center text-lg font-semibold text-text">
                    Message Actions
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        className="w-full py-2 rounded bg-primary/10 text-primary font-medium hover:bg-primary/20 transition"
                        onClick={() => {
                            // Example: reply action
                            // You can call your reply handler here
                            alert("Reply to message: " + (message.text || message.fileName || "Media"));
                            onClose();
                        }}
                    >
                        Reply
                    </button>
                    <button
                        className="w-full py-2 rounded bg-secondary/10 text-secondary font-medium hover:bg-secondary/20 transition"
                        onClick={() => {
                            // Example: delete action
                            alert("Delete message: " + (message.text || message.fileName || "Media"));
                            onClose();
                        }}
                    >
                        Delete
                    </button>
                    {/* Add more actions as needed */}
                </div>
                <button
                    className="mt-4 w-full py-2 rounded bg-text/10 text-text font-medium hover:bg-text/20 transition"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}