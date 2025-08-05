import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCircleMembers } from "../../../features/circleMembers/circleMembersSlice";
import { useOnlinePresenceContext } from "../../../hooks/useOnlinePresenceContext";
import ChatSidebarPresentational from "./ChatSidebarPresentational";

function ChatSidebarContainer() {
    const [isOpen, setIsOpen] = useState(true);
    const { circleId } = useParams();
    const dispatch = useDispatch();

    const { membersByCircle, status, error } = useSelector((state) => state.members);
    const members = membersByCircle[circleId] || [];

    // Online presence from context
    const { isUserOnline } = useOnlinePresenceContext();

    // Add online status to members
    const membersWithOnlineStatus = members.map(member => {
        const memberId = member.id || member.uid;
        const isOnline = isUserOnline(memberId);
        console.log(`Member ${member.username} (${memberId}): ${isOnline ? 'Online' : 'Offline'}`);
        return {
            ...member,
            isOnline
        };
    });

    // Members modal ref and functions
    const membersModalRef = useRef();

    const openMembersModal = () => {
        membersModalRef.current?.open();
    };

    const closeMembersModal = () => {
        membersModalRef.current?.close();
    };

    useEffect(() => {
        if (circleId && !membersByCircle[circleId]) {
            dispatch(fetchCircleMembers(circleId));
        }
    }, [circleId, dispatch, membersByCircle]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <ChatSidebarPresentational
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                members={membersWithOnlineStatus}
                loading={status === 'loading'}
                error={error}
                onShowAllMembers={openMembersModal}
                membersModalRef={membersModalRef}
                closeMembersModal={closeMembersModal}
            />
        </>
    );
}

export default ChatSidebarContainer;
