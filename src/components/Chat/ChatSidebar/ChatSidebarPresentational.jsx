import { useParams } from 'react-router'

function ChatSidebarPresentational() {
    const {circleId} = useParams();
    console.log(circleId)
    return (
        <>sidebar</>
    )
}

export default ChatSidebarPresentational
