// libs 
import { useSelector } from 'react-redux'
import { useState } from 'react';
// components
import ChatWindowPresentational from './ChatWindowPresentational'
function ChatWindowContainer() {
    const selectedCircle = useSelector(state => state.circles.selectedCircle);
    const [currentUser] = useState({ id: 'u2', username: 'Bob' });
    const [messages, setMessages] = useState([
        { id: 1, userId: 'u1', username: 'Alice', text: 'Hello everyone!' },
        { id: 2, userId: 'u2', username: 'Bob', text: 'Hi Alice!' },
        { id: 3, userId: 'u1', username: 'Alice', text: 'How are you?' },
        { id: 4, userId: 'u3', username: 'Charlie', text: 'Good morning!' },
        { id: 5, userId: 'u2', username: 'Bob', text: 'Doing well, thanks!' },
    ]);

    function handleSendMsg(msgText) {
        if (!msgText.trim()) return;
        setMessages(prev => [
            ...prev,
            {
                id: Date.now(),
                userId: currentUser.id,
                username: currentUser.username,
                text: msgText,
            }
        ]);
    }

    return (
        <ChatWindowPresentational messages={messages} selectedCircle={selectedCircle} onSendMsg={handleSendMsg} />
    )
}

export default ChatWindowContainer
