import { 
    getFirestore, 
    doc, 
    deleteDoc, 
    updateDoc, 
    arrayRemove, 
    collection, 
    getDocs
} from "firebase/firestore";

/**
 * Handle user leaving a circle with admin transfer logic
 * @param {string} circleId - The circle ID
 * @param {string} userId - The user ID who is leaving
 * @param {Object} circle - The circle data
 * @returns {Object} - Result with success status and redirect info
 */
export async function leaveCircle(circleId, userId, circle) {
    const db = getFirestore();
    
    try {
        // Get all members of the circle
        const membersColRef = collection(db, "circles", circleId, "members");
        const membersSnapshot = await getDocs(membersColRef);
        const allMembers = membersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const leavingMember = allMembers.find(member => member.id === userId);
        const isLeavingUserAdmin = leavingMember?.isAdmin || circle.createdBy?.uid === userId;
        const otherMembers = allMembers.filter(member => member.id !== userId);

        // If leaving user is admin and there are other members, transfer admin
        if (isLeavingUserAdmin && otherMembers.length > 0) {
            // Select a random member to become admin
            const randomIndex = Math.floor(Math.random() * otherMembers.length);
            const newAdmin = otherMembers[randomIndex];

            // Update the new admin's member record
            const newAdminMemberRef = doc(db, "circles", circleId, "members", newAdmin.id);
            await updateDoc(newAdminMemberRef, {
                isAdmin: true
            });

            // Update the circle's createdBy field
            const circleRef = doc(db, "circles", circleId);
            await updateDoc(circleRef, {
                createdBy: {
                    uid: newAdmin.id,
                    userName: newAdmin.username,
                    userEmail: newAdmin.email
                }
            });
        }

        // Remove the leaving user from circle members
        const leavingUserMemberRef = doc(db, "circles", circleId, "members", userId);
        await deleteDoc(leavingUserMemberRef);

        // Remove circle from user's joinedCircles array
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            joinedCircles: arrayRemove(circleId)
        });

        return {
            success: true,
            shouldRedirect: true,
            message: isLeavingUserAdmin && otherMembers.length > 0 
                ? `You have left the circle. Admin privileges have been transferred to ${otherMembers[Math.floor(Math.random() * otherMembers.length)].username}.`
                : "You have successfully left the circle."
        };

    } catch (error) {
        console.error("Error leaving circle:", error);
        return {
            success: false,
            shouldRedirect: false,
            message: "Failed to leave circle. Please try again."
        };
    }
}

/**
 * Check if user can leave the circle (business logic)
 * @param {string} userId - The user ID
 * @param {Array} members - Array of circle members
 * @param {Object} circle - The circle data
 * @returns {Object} - Can leave status and reason
 */
export function canLeaveCircle(userId, members) {
    const user = members.find(member => member.id === userId);
    if (!user) {
        return { canLeave: false, reason: "You are not a member of this circle." };
    }

    // For now, all members can leave. Add additional business rules here if needed
    // Example: Prevent leaving if user is the only admin and there are other members
    
    return { canLeave: true, reason: null };
}
