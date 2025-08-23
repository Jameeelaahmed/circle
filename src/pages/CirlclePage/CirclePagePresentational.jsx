import { lazy, Suspense } from "react";
import ChatSidebarContainer from "../../components/Chat/ChatSidebar/ChatSidebarContainer"

// Lazy load chat window (heavy component)
const ChatWindowContainer = lazy(() => import("../../components/Chat/ChatWindow/ChatWindowContainer"));

function CirclePagePresentational({ user }) {
    return (
        <div className="pt-paddingTop pr-1.5 pl-1.5 pb-1.5 flex h-screen">
            {user ? <ChatSidebarContainer /> : "loading"}
            {user ? <div className="flex-1">
                <ChatWindowContainer />
            </div> : "Loading..."}

        </div>
    )
}

export default CirclePagePresentational
