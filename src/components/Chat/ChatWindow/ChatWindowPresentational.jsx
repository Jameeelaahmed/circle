import ChatHeader from "../ChatHeader"
import ChatInputContainer from "../ChatInput/ChatInputContainer"
import ChatMessageContainer from "../ChatMessage/ChatMessageContainer"
function ChatWindowPresentational() {

    return (
        <div className="flex flex-col h-full min-h-0 bg-white/5 rounded-lg shadow-lg overflow-hidden">
            <div className="shrink-0">
                <ChatHeader />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
                <ChatMessageContainer />
            </div>
            <div className="shrink-0">
                <ChatInputContainer />
            </div>
        </div>
    );
}

export default ChatWindowPresentational
