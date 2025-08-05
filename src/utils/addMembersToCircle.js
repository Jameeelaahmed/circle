import { getFirestore, doc, setDoc, collection, getDoc } from "firebase/firestore";

export async function addMembersToCircle(circleId, creatorUid, creatorProfile, selectedMembers, user) {
    const db = getFirestore();
    const membersColRef = collection(db, "circles", circleId, "members");

    // Add creator
    await setDoc(doc(membersColRef, creatorUid), {
        email: creatorProfile.email || user.email,
        isAdmin: true,
        username: creatorProfile.username || user.username || "",
        photoURL: creatorProfile.photoURL || user.photoURL || "",
    });

    // Add selected members
    for (const member of selectedMembers) {
        const memberUid = member.value;
        if (memberUid !== creatorUid) {
            let memberProfile = {};
            try {
                const memberDocRef = doc(db, "users", memberUid);
                const memberDocSnap = await getDoc(memberDocRef);
                if (memberDocSnap.exists()) {
                    memberProfile = memberDocSnap.data();
                }
            } catch (err) {
                console.error(`Error fetching member profile for ${memberUid}:`, err);
            }

            await setDoc(doc(membersColRef, memberUid), {
                email: memberProfile.email || "",
                isAdmin: false,
                username: memberProfile.username || "",
                photoURL: memberProfile.photoURL || "",
            });
        }
    }
}
