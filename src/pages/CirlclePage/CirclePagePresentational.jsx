import { lazy, Suspense } from "react";
import ChatSidebarContainer from "../../components/Chat/ChatSidebar/ChatSidebarContainer"
import Skeleton from "@mui/material/Skeleton";

// Lazy load chat window (heavy component)
const ChatWindowContainer = lazy(() => import("../../components/Chat/ChatWindow/ChatWindowContainer"));

function CirclePagePresentational({ user }) {
    return (
        <div className="pt-paddingTop pr-1.5 pl-1.5 pb-1.5 flex h-screen">
            {user ? (
                <ChatSidebarContainer />
            ) : (
                <div className="w-[320px] flex flex-col gap-4 p-4">
                    {/* Circle Details Skeleton */}
                    <div className="flex items-center gap-3 mb-2">
                        <Skeleton variant="circular" width={48} height={48} />
                        <Skeleton variant="text" width={180} height={32} />
                    </div>
                    <Skeleton variant="text" width={120} height={24} />
                    {/* Members Skeleton */}
                    <div className="mt-4">
                        <Skeleton variant="text" width={100} height={20} />
                        <div className="flex flex-col gap-2 mt-2">
                            {[...Array(2)].map((_, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <Skeleton variant="circular" width={24} height={24} />
                                    <Skeleton variant="text" width={80} height={18} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Memories Skeleton */}
                    <div className="mt-4">
                        <Skeleton variant="text" width={80} height={20} />
                        <Skeleton variant="rectangular" width={220} height={40} />
                    </div>
                    {/* Events Skeleton */}
                    <div className="mt-4">
                        <Skeleton variant="text" width={80} height={20} />
                        <Skeleton variant="rectangular" width={220} height={40} />
                    </div>
                </div>
            )}
            {user ? (
                <div className="flex-1">
                    <ChatWindowContainer />
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <Skeleton variant="rectangular" width="80%" height="80%" className="rounded-2xl" />
                </div>
            )}
        </div>
    )
}

export default CirclePagePresentational
