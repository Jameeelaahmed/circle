// Message action handlers for chat functionality
import { doc, updateDoc, deleteDoc, getDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase-config";

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

export async function handleDeleteMessage(messageId, deleteOption, circleId, userId, setError) {
    try {
        const messageRef = doc(db, "circles", circleId, "chat", messageId);

        if (deleteOption === 'forEveryone') {
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

export function handleEditMessage(message, setEditingMessage) {
    // Ensure the message has the correct ID field for Firebase
    const editMessage = {
        ...message,
        id: message.id || message.messageId
    };

    setEditingMessage(editMessage);
}

export function handleOpenModal(messageId, deleteModalRefs) {
    setTimeout(() => {
        if (deleteModalRefs.current[messageId] && typeof deleteModalRefs.current[messageId].open === 'function') {
            deleteModalRefs.current[messageId].open();
        } else {
            console.warn(`Modal ref for message ${messageId} not found or open method not available`);
        }
    }, 0);
}

export function handleCloseModal(messageId, deleteModalRefs) {
    if (deleteModalRefs.current[messageId] && typeof deleteModalRefs.current[messageId].close === 'function') {
        deleteModalRefs.current[messageId].close();
    }
}
