import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCircleMembers } from "../../../features/circleMembers/circleMembersSlice";
import useOnlinePresence from "../../../hooks/chathooks/useOnlinePresence";
import ChatSidebarPresentational from "./ChatSidebarPresentational";

function ChatSidebarContainer() {
    const circleDetailsRef = useRef();
    const [isOpen, setIsOpen] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const { circleId } = useParams();
    const dispatch = useDispatch();
    const { membersByCircle, status, error } = useSelector((state) => state.members);
    const members = membersByCircle[circleId] || [];
    const { isUserOnline } = useOnlinePresence();
    const membersWithOnlineStatus = members.map(member => ({
        ...member,
        isOnline: isUserOnline(member.id)
    }));

    const membersModalRef = useRef();

    function handleOpenCircleDetailsModal() {
        circleDetailsRef.current.open();
    }
    function handleCloseCircleDetailsModal() {
        circleDetailsRef.current.close();
    }
    useEffect(() => {
        if (circleId && !membersByCircle[circleId]) {
            dispatch(fetchCircleMembers(circleId));
        }
    }, [circleId, dispatch, membersByCircle]);

    // Detect screen size
    useEffect(() => {
        const checkScreen = () => {
            const small = window.innerWidth < 768;
            setIsSmallScreen(small);
            if (small) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const toggleSidebar = () => setIsOpen(prev => !prev);

    return (
        <ChatSidebarPresentational
            circleDetailsRef={circleDetailsRef}
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            isSmallScreen={isSmallScreen}
            members={membersWithOnlineStatus}
            loading={status === 'loading'}
            error={error}
            onShowAllMembers={() => membersModalRef.current?.open()}
            membersModalRef={membersModalRef}
            closeMembersModal={() => membersModalRef.current?.close()}
            closeSidebar={() => setIsOpen(false)}
            onOpen={handleOpenCircleDetailsModal}
            onClose={handleCloseCircleDetailsModal}
        />
    );
}

export default ChatSidebarContainer;
