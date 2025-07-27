import ChatHeaderContainer from "../ChatHeader/ChatHeaderContainer";
import ChatInputContainer from "../ChatInput/ChatInputContainer"
import ChatMessageContainer from "../ChatMessage/ChatMessageContainer"
function ChatWindowPresentational({ selectedCircle, messages, onSendMsg }) {
    return (
        <div className="flex flex-col h-full min-h-0 bg-white/5 rounded-lg shadow-lg">
            <div className="shrink-0">
                <ChatHeaderContainer circle={selectedCircle} />
            </div>
            <div className="flex-1 items-end h-full overflow-y-auto">
                <ChatMessageContainer messages={messages} />
            </div>
            <div className="shrink-0">
                <ChatInputContainer onSendMsg={onSendMsg} />
            </div>
        </div>
    );
}

export default ChatWindowPresentational
