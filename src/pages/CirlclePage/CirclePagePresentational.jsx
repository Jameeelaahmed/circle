import ChatSidbarContainer from "../../components/Chat/ChatSidebar/ChatSidbarContainer"
import ChatWindowPresentational from "../../components/Chat/ChatWindow/ChatWindowContainer"

function CirclePagePresentational() {
    return (
        <div className="pt-paddingTop pr-1.5 pl-1.5 pb-1.5 flex h-screen">
            <div className="w-64 bg-main backdrop-blur-md border-r border-white/10">
                <ChatSidbarContainer />
            </div>
            <div className="flex-1">
                <ChatWindowPresentational />
            </div>
        </div>
    )
}

export default CirclePagePresentational
