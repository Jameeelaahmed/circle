// Message action handlers for chat functionality
import { doc, updateDoc, deleteDoc, getDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase-config";

/**
 * Handle emoji reactions to messages
 * @param {string} messageId - ID of the message to react to
 * @param {string} emoji - Emoji to add as reaction
 * @param {string} circleId - ID of the circle/chat
 * @param {string} userId - Current user's ID
 * @param {function} setError - Error state setter function
 */
export async function handleReact(messageId, emoji, circleId, userId, setError) {
    try {
        const messageRef = doc(db, "circles", circleId, "chat", messageId);
        // Get current reactions
        const msgSnap = await getDoc(messageRef);
        let currentReacts = [];
        if (msgSnap.exists()) {
            currentReacts = msgSnap.data().react || [];
        }
        // Remove previous reaction by this user
        const filteredReacts = currentReacts.filter(r => r.userId !== userId);
        // Add new reaction
        const newReacts = [...filteredReacts, { userId, emoji }];
        await updateDoc(messageRef, { react: newReacts });
    } catch (err) {
        setError("Failed to react: " + err.message);
    }
}

/**
 * Handle message deletion (for everyone or just current user)
 * @param {string} messageId - ID of the message to delete
 * @param {string} deleteOption - 'forEveryone' or 'forMe'
 * @param {string} circleId - ID of the circle/chat
 * @param {string} userId - Current user's ID
 * @param {function} setError - Error state setter function
 */
export async function handleDeleteMessage(messageId, deleteOption, circleId, userId, setError) {
    try {
        const messageRef = doc(db, "circles", circleId, "chat", messageId);

        if (deleteOption === 'forEveryone') {
            // Delete the entire message document
            await deleteDoc(messageRef);
        } else {
            // Delete for current user only - add user to deletedFor array
            const msgSnap = await getDoc(messageRef);
            if (msgSnap.exists()) {
                const currentDeletedFor = msgSnap.data().deletedFor || [];
                if (!currentDeletedFor.includes(userId)) {
                    await updateDoc(messageRef, {
                        deletedFor: arrayUnion(userId)
                    });
                }
            }
        }
    } catch (err) {
        setError("Failed to delete message: " + err.message);
    }
}

/**
 * Handle message editing - prepare message for editing
 * @param {object} message - Message object to edit
 * @param {function} setEditingMessage - Function to set editing state
 */
export function handleEditMessage(message, setEditingMessage) {
    // Ensure the message has the correct ID field for Firebase
    const editMessage = {
        ...message,
        id: message.id || message.messageId
    };

    setEditingMessage(editMessage);
}

/**
 * Handle modal opening with proper timing
 * @param {string} messageId - ID of the message
 * @param {object} deleteModalRefs - Ref object containing modal references
 */
export function handleOpenModal(messageId, deleteModalRefs) {
    setTimeout(() => {
        if (deleteModalRefs.current[messageId] && typeof deleteModalRefs.current[messageId].open === 'function') {
            deleteModalRefs.current[messageId].open();
        } else {
            console.warn(`Modal ref for message ${messageId} not found or open method not available`);
        }
    }, 0);
}

/**
 * Handle modal closing
 * @param {string} messageId - ID of the message
 * @param {object} deleteModalRefs - Ref object containing modal references
 */
export function handleCloseModal(messageId, deleteModalRefs) {
    if (deleteModalRefs.current[messageId] && typeof deleteModalRefs.current[messageId].close === 'function') {
        deleteModalRefs.current[messageId].close();
    }
}
