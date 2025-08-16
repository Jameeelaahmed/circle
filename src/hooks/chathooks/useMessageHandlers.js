import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAuth } from '../useAuth';
export function useMessageHandlers(
    messageManager,
    typing,
    replyTo,
    setReplyTo,
    editingMessage,
    setEditingMessage,
    handleAutoDir,
    onNotMember
) {
    const { circleId } = useParams()
    const typingDebounceRef = useRef(null);
    const { userId } = useAuth()
    const members =
        useSelector(state =>
            state.members?.membersByCircle?.[circleId] || []
        );
    const isMember = members.some(member => member.id === userId || member.uid === userId);

    const handleSendMsg = async (e) => {
        e.preventDefault();
        console.log(isMember);

        if (!isMember) {

            if (onNotMember) onNotMember();
            return;
        }
        const value = messageManager.msgVal.current.value;
        if (!value.trim()) return;

        typing.handleStopTyping();

        messageManager.clearInput();

        if (editingMessage) {
            try {
                const messageId = editingMessage.id || editingMessage.messageId;
                await messageManager.editMessage(messageId, value);
                setEditingMessage(null);
            } catch (err) {
                console.log("edit error", err.message);
            }
            return;
        }

        if (replyTo) setReplyTo(null);

        try {
            await messageManager.sendTextMessage(value, replyTo);
        } catch (err) {
            console.log("msg error", err.message);
        }
    };

    const handleCancelEdit = () => {
        setEditingMessage(null);
        messageManager.clearInput();
    };

    const handleInput = (e) => {
        handleAutoDir(e.target.value);
        messageManager.handleInput(e);

        // Debounce typing indicator updates
        if (typingDebounceRef.current) {
            clearTimeout(typingDebounceRef.current);
        }

        // Handle typing indicator with debouncing
        if (e.target.value.trim().length > 0) {
            typing.handleStartTyping();
        } else {
            // Debounce stop typing to avoid rapid on/off
            typingDebounceRef.current = setTimeout(() => {
                typing.handleStopTyping();
            }, 300);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMsg(e);
        } else if (e.key === 'Escape' && editingMessage) {
            e.preventDefault();
            handleCancelEdit();
        }
    };

    return {
        handleSendMsg,
        handleCancelEdit,
        handleInput,
        handleKeyDown
    };
}
