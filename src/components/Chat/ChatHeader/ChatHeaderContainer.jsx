// libs
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useAuth } from "../../../hooks/useAuth";
import useContextMenu from "../../../hooks/chathooks/useContextMenu";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";

// utils
import { leaveCircle } from "../../../utils/leaveCircle";
import { toastStyles } from "../../../utils/toastStyles";
// components
import ChatHeaderPresentational from './ChatHeaderPresentational'
import Modal from "../../ui/Modal/Modal";
import ClearChatModalContainer from "../../ui/Modal/ClearChatModal/ClearChatModalContainer";
import LeaveCircleModalContainer from "../../ui/Modal/LeaveCircleModal/LeaveCircleModalContainer";

function ChatHeaderContainer({ circle }) {
    const status = useSelector(state => state.circles.status);
    const isLoading = status === 'loading' || !circle;
    const { userId } = useAuth();
    const navigate = useNavigate();
    const clearChatModalRef = useRef();
    const leaveCircleModalRef = useRef();

    // Context menu for the More Vertical button
    const { menu, setMenu, menuDirection, handleContextMenu } = useContextMenu({
        menuWidth: 200,
        menuHeight: 120
    });

    // Handle More Vertical button click
    const handleMoreClick = (e) => {
        e.preventDefault();
        handleContextMenu(e, { type: 'header' });
    };

    // Handle Clear Chat
    const handleClearChat = async () => {
        clearChatModalRef.current?.open();
        setMenu(m => ({ ...m, visible: false }));
    };

    if (!circle) {
        // Show a skeleton styled like the header
        return (
            <div className="flex items-center gap-3 px-4 py-2 bg-main">
                <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ bgcolor: "var(--color-inputsBg)", opacity: 0.5 }}
                />
                <Skeleton
                    variant="text"
                    width={160}
                    height={28}
                    sx={{ bgcolor: "var(--color-inputsBg)", opacity: 0.5 }}
                />
            </div>
        );
    }
    const confirmClearChat = async () => {
        try {
            if (!circle?.id) return;

            // Get all messages in the chat
            const messagesRef = collection(db, "circles", circle.id, "chat");
            const snapshot = await getDocs(messagesRef);

            // Add current user to deletedFor array of each message
            const updatePromises = snapshot.docs.map(docSnap => {
                const messageRef = doc(db, "circles", circle.id, "chat", docSnap.id);
                return updateDoc(messageRef, {
                    deletedFor: arrayUnion(userId)
                });
            });

            await Promise.all(updatePromises);

        } catch (error) {
            console.error("Error clearing chat:", error);
            toast.error("Failed to clear chat. Please try again.", toastStyles);
        }
    };    // Handle Leave Circle
    const handleLeaveCircle = async () => {
        leaveCircleModalRef.current?.open();
        setMenu(m => ({ ...m, visible: false }));
    };

    const confirmLeaveCircle = async () => {
        try {
            if (!circle?.id || !userId) return;

            const result = await leaveCircle(circle.id, userId, circle);

            if (result.success) {
                // Show success message
                toast.success(result.message, toastStyles);

                // Redirect to circles page since user left the circle
                if (result.shouldRedirect) {
                    navigate('/circles');
                }
            } else {
                toast.error(result.message, toastStyles);
            }

        } catch (error) {
            console.error("Error leaving circle:", error);
            toast.error("Failed to leave circle. Please try again.", toastStyles);
        }
    };

    const hasImage = !!circle.imageUrl;


    // Close context menu
    const closeMenu = () => {
        setMenu(m => ({ ...m, visible: false }));
    };

    return (
        <>
            <ChatHeaderPresentational
                circle={circle}
                isLoading={isLoading}
                menu={menu}
                menuDirection={menuDirection}
                onMoreClick={handleMoreClick}
                onClearChat={handleClearChat}
                onLeaveCircle={handleLeaveCircle}
                closeMenu={closeMenu}
                hasImage={hasImage}
            />

            {/* Clear Chat Confirmation Modal */}
            <Modal ref={clearChatModalRef}>
                <ClearChatModalContainer
                    close={() => clearChatModalRef.current?.close()}
                    onConfirmClear={confirmClearChat}
                />
            </Modal>

            {/* Leave Circle Confirmation Modal */}
            <Modal ref={leaveCircleModalRef}>
                <LeaveCircleModalContainer
                    close={() => leaveCircleModalRef.current?.close()}
                    onConfirmLeave={confirmLeaveCircle}
                    circleName={circle?.circleName}
                />
            </Modal>
        </>
    )
}

export default ChatHeaderContainer
