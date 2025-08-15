import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@mui/material";
import Modal from "../../ui/Modal/Modal";
import MembersModalContainer from "../../ui/Modal/MembersModal/MembersModalContainer";
import EventConfirmationStack from "../../EventConfirmation/EventConfirmationStack";
import { useParams } from "react-router";
import CircleDetailsContainer from "../../ui/Modal/CircleDetailsModal/CircleDetailsContainer";

function ChatSidebarPresentational({
    isOpen,
    toggleSidebar,
    members = [],
    loading = false,
    error = null,
    onShowAllMembers,
    membersModalRef,
    closeMembersModal,
    circleDetailsRef,
    onOpen,
    onClose
}) {
    const { circleId } = useParams();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // Detect screen size for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="relative h-full">
            <button
                onClick={toggleSidebar}
                className={`absolute top-1/2 -translate-y-1/2 z-50 bg-main text-text p-1.5 rounded-lg hover:bg-primary/80 transition-colors duration-200 backdrop-blur-sm
                    ${isSmallScreen
                        ? isOpen
                            ? "-right-3" // Inside edge when open
                            : "left-0 -translate-x-1/2" // Hug left edge when closed
                        : "-right-3" // Outside on desktop
                    }
                `}
            >
                <ChevronLeft
                    className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Small screen overlay */}
            {isSmallScreen && isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/40 z-40"
                />
            )}

            {/* Sidebar */}
            <Motion.div
                initial={{ width: isSmallScreen ? 0 : 280 }}
                animate={{
                    width: isOpen ? 280 : 0,
                    position: isSmallScreen ? "fixed" : "relative",
                    right: isSmallScreen ? 0 : "auto",
                    top: 0,
                    height: "100%",
                    zIndex: isSmallScreen ? 50 : "auto"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`h-full overflow-hidden backdrop-blur-sm ltr:rounded-tl-3xl rtl:rounded-tr-3xl ltr:rounded-bl-3xl rtl:rounded-br-3xl ${isOpen
                    ? "bg-main/95 border-white/10"
                    : "bg-transparent border-transparent"
                    }`}
            >
                <div className="w-70 h-full flex flex-col">
                    {/* Header */}
                    <div className="p-4.5 border-b border-text/10 flex justify-between items-center">
                        <h3 className="text-sm font-medium text-text">
                            Circle Details
                        </h3>
                        <p className="font-bold text-xs text-primary cursor-pointer" onClick={onOpen}>see details</p>
                        <Modal ref={circleDetailsRef}>
                            <CircleDetailsContainer onClose={onClose} />
                        </Modal>
                    </div>

                    {/* Members */}
                    <div className="flex-1 p-3 border-b border-white/10">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs font-medium text-text-300">
                                Members ({members.length})
                            </h4>
                            <button
                                onClick={onShowAllMembers}
                                className="text-xs text-primary hover:text-primary/80 transition-colors"
                            >
                                See more
                            </button>
                        </div>
                        <div className="space-y-1">
                            {loading ? (
                                <div className="space-y-2">
                                    {[...Array(4)].map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-2 p-2"
                                        >
                                            <Skeleton
                                                variant="circular"
                                                width={24}
                                                height={24}
                                                sx={{
                                                    bgcolor:
                                                        "rgba(255, 255, 255, 0.1)",
                                                    flexShrink: 0
                                                }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <Skeleton
                                                    variant="text"
                                                    width="70%"
                                                    height={16}
                                                    sx={{
                                                        bgcolor:
                                                            "rgba(255, 255, 255, 0.1)",
                                                        mb: 0.5
                                                    }}
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    width="40%"
                                                    height={12}
                                                    sx={{
                                                        bgcolor:
                                                            "rgba(255, 255, 255, 0.08)"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="p-2 text-center">
                                    <p className="text-xs text-red-400">
                                        Error loading members
                                    </p>
                                </div>
                            ) : members.length > 0 ? (
                                members
                                    .sort((a, b) => {
                                        if (a.isOnline && !b.isOnline) return -1;
                                        if (!a.isOnline && b.isOnline) return 1;
                                        return a.username.localeCompare(
                                            b.username
                                        );
                                    })
                                    .slice(0, 4)
                                    .map((member) => (
                                        <div
                                            key={member.id || member.uid}
                                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5 transition-colors"
                                        >
                                            <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-primary relative">
                                                {member.profileImage ? (
                                                    <img
                                                        src={member.imageUrl}
                                                        alt={member.username}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-text text-xs font-medium">
                                                        {member.username
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                )}
                                                {member.isOnline && (
                                                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-main"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-text truncate">
                                                    {member.username}
                                                </p>
                                                <p
                                                    className={`text-xs ${member.isOnline
                                                        ? "text-green-400"
                                                        : "text-gray-400"
                                                        }`}
                                                >
                                                    {member.isOnline
                                                        ? "Online"
                                                        : "Offline"}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className="p-2 text-center">
                                    <p className="text-xs text-text-400">
                                        No members found
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Memories */}
                    <div className="flex-1 p-3 border-b border-white/10">
                        <h4 className="text-xs font-medium text-text-300 mb-2">
                            Memories
                        </h4>
                    </div>

                    {/* Events */}
                    <div className="flex-1 p-3 overflow-y-auto">
                        <h4 className="text-xs font-medium text-text-300 mb-2">
                            Events
                        </h4>
                        <EventConfirmationStack circleId={circleId} />
                    </div>
                </div>
            </Motion.div>

            {/* Members Modal */}
            <Modal ref={membersModalRef}>
                <MembersModalContainer
                    members={members}
                    loading={loading}
                    error={error}
                    closeModal={closeMembersModal}
                />
            </Modal>
        </div>
    );
}

export default ChatSidebarPresentational;
