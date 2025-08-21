import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function sendCircleInvitations({ circleId, members, memberOptions, user, circleName, closeModal }) {
    const db = getFirestore();
    const results = [];

    for (const member of members) {
        if (member.value !== user.uid) {
            const memberProfile = memberOptions.find(opt => opt.value === member.value);

            try {
                await addDoc(collection(db, "circleRequests"), {
                    circleId: circleId,
                    type: "invitation",
                    invitedUserId: member.value,
                    invitedUserUsername: memberProfile?.label || "",
                    invitedUserEmail: memberProfile?.userData?.email || "",
                    invitedUserPhotoUrl: memberProfile?.userData?.photoUrl || "",
                    inviterId: user.uid,
                    inviterUsername: user.username,
                    circleName: circleName || "",
                    message: `${user.username} invited you to join the circle "${circleName || ""}".`,
                    status: "pending",
                    createdAt: serverTimestamp()
                });
                results.push({ memberId: member.value, success: true });
                closeModal()
            } catch (error) {
                results.push({ memberId: member.value, success: false, error });
            }
        }
    }
    return results;
}