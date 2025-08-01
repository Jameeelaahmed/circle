// libs 
import { useSelector } from 'react-redux'
// components
import ChatWindowPresentational from './ChatWindowPresentational'

function ChatWindowContainer() {
    const selectedCircle = useSelector(state => state.circles.selectedCircle);

    return (
        <ChatWindowPresentational
            selectedCircle={selectedCircle}
        />
    )
}

export default ChatWindowContainer
