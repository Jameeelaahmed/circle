/**
 * Custom hook to handle core message operations
 * Manages sending, editing, input handling, and keyboard interactions
 */
export function useMessageHandlers(
    messageManager,
    typing,
    replyTo,
    setReplyTo,
    editingMessage,
    setEditingMessage,
    handleAutoDir
) {
    const handleSendMsg = async (e) => {
        e.preventDefault();
        const value = messageManager.msgVal.current.value;
        if (!value.trim()) return;

        // Stop typing indicator when sending message
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

        // Handle typing indicator
        if (e.target.value.trim().length > 0) {
            typing.handleStartTyping();
        } else {
            typing.handleStopTyping();
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
