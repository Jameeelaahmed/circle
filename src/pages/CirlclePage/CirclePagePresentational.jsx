import ChatSidbarContainer from "../../components/Chat/ChatSidebar/ChatSidbarContainer"
import ChatWindowContainer from "../../components/Chat/ChatWindow/ChatWindowContainer"

function CirclePagePresentational() {
    return (
        <div className="pt-paddingTop pr-1.5 pl-1.5 pb-1.5 flex h-screen max-w-full overflow-hidden">
            <div className="w-64 bg-main backdrop-blur-md border-r border-white/10 flex-shrink-0">
                <ChatSidbarContainer />
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
                <ChatWindowContainer />
            </div>
        </div>
    )
}

export default CirclePagePresentational
