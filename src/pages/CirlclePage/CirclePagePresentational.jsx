import { lazy, Suspense } from "react";
import ChatSidbarContainer from "../../components/Chat/ChatSidebar/ChatSidbarContainer"

// Lazy load chat window (heavy component)
const ChatWindowContainer = lazy(() => import("../../components/Chat/ChatWindow/ChatWindowContainer"));

function CirclePagePresentational() {
    return (
        <div className="pt-paddingTop pr-1.5 pl-1.5 pb-1.5 flex h-screen">
            <div className="w-64 bg-main backdrop-blur-md border-r border-white/10">
                <ChatSidbarContainer />
            </div>
            <Suspense fallback={<div className="flex-1" />}>
                <div className="flex-1">
                    <ChatWindowContainer />
                </div>
            </Suspense>
        </div>
    )
}

export default CirclePagePresentational
