import ChatHeaderContainer from "../ChatHeader/ChatHeaderContainer";
import ChatInputContainer from "../ChatInput/ChatInputContainer"
import ChatMessageContainer from "../ChatMessage/ChatMessageContainer"

function ChatWindowPresentational({ selectedCircle, circleId, replyTo, setReplyTo, setEditingMessage, editingMessage }) {

    return (
        <div className="flex flex-col h-full min-h-0 bg-white/5 rounded-lg shadow-lg">
            <div className="shrink-0">
                <ChatHeaderContainer circle={selectedCircle} />
            </div>
            <div className="flex-1 flex flex-col justify-end overflow-y-auto">
                <ChatMessageContainer
                    circleId={circleId}
                    setReplyTo={setReplyTo}
                    setEditingMessage={setEditingMessage}
                />
            </div>
            <div className="shrink-0">
                <ChatInputContainer
                    circleId={circleId}
                    replyTo={replyTo}
                    setReplyTo={setReplyTo}
                    editingMessage={editingMessage}
                    setEditingMessage={setEditingMessage}
                />
            </div>
        </div >
    );
}

export default ChatWindowPresentational
