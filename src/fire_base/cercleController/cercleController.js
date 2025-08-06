import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { pushNotificationToUser } from "../notificationController/notificationController";
const getCercleMembersReceivers = async (cercleId, myId) => {
  try {
    console.log("cercleId", cercleId);
    const membersRef = collection(db, "circles", cercleId, "members");
    const querySnapshot = await getDocs(membersRef);
    console.log("querySnapshot", querySnapshot);

    const members = querySnapshot.docs.map((doc) => {
      if (doc.id === myId) return null;
      return {
        id: doc.id,
      };
    });

    console.log("Members:", members);
    return members;
  } catch (error) {
    console.error("Error getting cercle members:", error);
    throw error;
  }
};

export const sendNotificationMembers = async (
  cercleId,
  myId,
  newNotification,
) => {
  const members = await getCercleMembersReceivers(cercleId, myId);
  members.forEach((member) => {
    if (member) {
      pushNotificationToUser(member.id, newNotification);
    }
  });
};
