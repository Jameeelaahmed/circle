import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";

export async function addCircletoUser(userId, circleId) {
    const db = getFirestore();
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        joinedCircles: arrayUnion(circleId)
    });
}
