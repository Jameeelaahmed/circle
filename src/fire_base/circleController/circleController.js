import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import { pushNotificationToUser } from "../notificationController/notificationController";
const getCircleMembersReceivers = async (circleId, myId) => {
  try {
    const membersRef = collection(db, "circles", circleId, "members");
    const querySnapshot = await getDocs(membersRef);

    const members = querySnapshot.docs.map((doc) => {
      if (doc.id === myId) return null;
      return {
        id: doc.id,
      };
    });

    console.log("Members:", members);
    return members;
  } catch (error) {
    console.error("Error getting circle members:", error);
    throw error;
  }
};

export const sendNotificationMembers = async (
  circleId,
  myId,
  newNotification,
) => {
  const members = await getCircleMembersReceivers(circleId, myId);
  members.forEach((member) => {
    if (member) {
      pushNotificationToUser(member.id, newNotification);
    }
  });
};
