// libs
import { useSelector } from "react-redux";
import { useRef } from "react";
// components
import ChatHeaderPresentational from './ChatHeaderPresentational'

function ChatHeaderContainer({ circle }) {
    const status = useSelector(state => state.circles.status);
    const isLoading = status === 'loading' || !circle;
    const pollModalRef = useRef()
    function handleOpenPollModal() {
        pollModalRef.current.open();
    }
    function handleClosePollModal() {
        pollModalRef.current.close()
    }
    return (
        <ChatHeaderPresentational
            circle={circle}
            isLoading={isLoading}
            handleOpenPollModal={handleOpenPollModal}
            pollRef={pollModalRef}
            handleClosePollModal={handleClosePollModal}
        />
    )
}

export default ChatHeaderContainer
