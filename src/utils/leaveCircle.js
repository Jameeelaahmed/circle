import {
    getFirestore,
    doc,
    deleteDoc,
    updateDoc,
    arrayRemove,
    collection,
    getDocs
} from "firebase/firestore";

export async function leaveCircle(circleId, userId) {
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
        const isLeavingUserOwner = leavingMember?.isOwner;
        const isLeavingUserAdmin = leavingMember?.isAdmin;
        const otherMembers = allMembers.filter(member => member.id !== userId);

        // Prevent owner from leaving (optional, business logic)
        if (isLeavingUserOwner) {
            return {
                success: false,
                shouldRedirect: false,
                message: "Circle owner cannot leave the circle. Transfer ownership first."
            };
        }

        // If leaving user is admin (but not owner) and there are other members, transfer admin
        if (isLeavingUserAdmin && otherMembers.length > 0) {
            // Select a random member to become admin
            const randomIndex = Math.floor(Math.random() * otherMembers.length);
            const newAdmin = otherMembers[randomIndex];

            // Update the new admin's member record
            const newAdminMemberRef = doc(db, "circles", circleId, "members", newAdmin.id);
            await updateDoc(newAdminMemberRef, {
                isAdmin: true
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

export function canLeaveCircle(userId, members) {
    const user = members.find(member => member.id === userId);
    if (!user) {
        return { canLeave: false, reason: "You are not a member of this circle." };
    }
    return { canLeave: true, reason: null };
}
