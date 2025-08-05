import { lazy, Suspense } from "react";
import ChatSidebarContainer from "../../components/Chat/ChatSidebar/ChatSidebarContainer"

// Lazy load chat window (heavy component)
const ChatWindowContainer = lazy(() => import("../../components/Chat/ChatWindow/ChatWindowContainer"));

function CirclePagePresentational() {
    return (
        <div className="pt-paddingTop pr-1.5 pl-1.5 pb-1.5 flex h-screen">
            <ChatSidebarContainer />
            <Suspense fallback={<div className="flex-1" />}>
                <div className="flex-1">
                    <ChatWindowContainer />
                </div>
            </Suspense>
        </div>
    )
}

export default CirclePagePresentational
