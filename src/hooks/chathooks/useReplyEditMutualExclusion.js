import { useEffect, useRef } from "react";

/**
 * Custom hook to handle mutual exclusion between reply and edit modes
 * Ensures only one mode is active at a time and handles proper state transitions
 */
export function useReplyEditMutualExclusion(
    replyTo,
    setReplyTo,
    editingMessage,
    setEditingMessage,
    messageManager
) {
    // Refs to track previous values
    const prevReplyToRef = useRef(replyTo);
    const prevEditingMessageRef = useRef(editingMessage);
    const editingPopulatedRef = useRef(false);

    // Handle mutual exclusion between reply and edit modes
    useEffect(() => {
        const prevReplyTo = prevReplyToRef.current;
        const prevEditingMessage = prevEditingMessageRef.current;

        // Detect which value changed
        const replyToChanged = replyTo !== prevReplyTo;
        const editingMessageChanged = editingMessage !== prevEditingMessage;

        // Handle mutual exclusion based on what changed
        if (replyToChanged && replyTo && editingMessage) {
            // Reply was just set and edit is active, clear edit
            setEditingMessage(null);
            messageManager.clearInput(); // Clear input when switching from edit to reply
        } else if (editingMessageChanged && editingMessage && replyTo) {
            // Edit was just set and reply is active, clear reply
            setReplyTo(null);
        }

        // Update refs for next comparison
        prevReplyToRef.current = replyTo;
        prevEditingMessageRef.current = editingMessage;
    }, [replyTo, editingMessage, setReplyTo, setEditingMessage, messageManager]);

    // Populate input field when editing starts
    useEffect(() => {
        if (editingMessage && !editingPopulatedRef.current) {
            // Populate input for editing only once per editing session
            messageManager.setInputValue(editingMessage.text);
            messageManager.msgVal.current?.focus();
            messageManager.msgVal.current?.select();
            editingPopulatedRef.current = true;
        } else if (!editingMessage) {
            // Reset the populated flag when editing ends
            editingPopulatedRef.current = false;
        }
    }, [editingMessage, messageManager]);
}
