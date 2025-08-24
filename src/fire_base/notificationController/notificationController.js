import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { getCircleById } from "../circleController/circleController";
import { db } from "../../firebase-config"; // Adjust path as needed

/**
 * Base function to push notification to user's notifications subcollection
 */
export const pushNotificationBase = async (uid, notificationBody) => {
  try {
    // Create reference to user's notifications subcollection
    const notificationsRef = collection(db, "users", uid, "notifications");

    const notification = {
      ...notificationBody,
      createdAt: serverTimestamp(),
      read: false,
    };

    // Add document to subcollection (Firestore will auto-generate ID)
    const docRef = await addDoc(notificationsRef, notification);

    // Return notification with the generated ID
    return {
      id: docRef.id,
      ...notification,
      createdAt: Timestamp.now(), // For immediate use, since serverTimestamp is null until written
    };
  } catch (error) {
    console.error("Error pushing notification:", error);
    throw error;
  }
};

/**
 * Create notification object with consistent structure
 */
export const createNotification = ({
  type,
  title,
  message,
  link = "",
  senderId = "",
  avatar = "",
  isRead = false,
  circleName = "",
}) => {
  return {
    type,
    title,
    message,
    link,
    senderId,
    avatar,
    isRead,
    circleName,
    // Remove manual ID and time generation - let Firestore handle this
  };
};

/**
 * Push a complete notification to user
 */
export const pushNotificationToUser = async (uid, notificationData) => {
  const notification = createNotification(notificationData);
  return await pushNotificationBase(uid, notification);
};
export const inviteUserToCircleNotification = async (uid, circleId, sender) => {
  const { circleName, imageUrl } = await getCircleById(circleId);

  const notification = createNotification({
    avatar: imageUrl,
    type: "invite",
    title: `${sender} invited you to join ${circleName}`,
    message: "Join now to get started! ",
    link: `/circle/${circleId}`,
  });
  return await pushNotificationBase(uid, notification);
};

/**
 * Mark a notification as read
 */
export const markNotificationAsRead = async (uid, notificationId) => {
  try {
    const notificationRef = doc(
      db,
      "users",
      uid,
      "notifications",
      notificationId,
    );
    await updateDoc(notificationRef, {
      read: true,
      readAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

/**
 * Mark multiple notifications as read
 */
export const markMultipleNotificationsAsRead = async (uid, notificationIds) => {
  try {
    const promises = notificationIds.map((notificationId) =>
      markNotificationAsRead(uid, notificationId),
    );

    await Promise.all(promises);
  } catch (error) {
    console.error("Error marking multiple notifications as read:", error);
    throw error;
  }
};

/**
 * Delete a notification
 */
export const deleteNotification = async (uid, notificationId) => {
  try {
    const notificationRef = doc(
      db,
      "users",
      uid,
      "notifications",
      notificationId,
    );
    await deleteDoc(notificationRef);
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

/**
 * Delete multiple notifications
 */
export const deleteMultipleNotifications = async (uid, notificationIds) => {
  try {
    const promises = notificationIds.map((notificationId) =>
      deleteNotification(uid, notificationId),
    );

    await Promise.all(promises);
  } catch (error) {
    console.error("Error deleting multiple notifications:", error);
    throw error;
  }
};

/**
 * Update notification data
 */
export const updateNotification = async (uid, notificationId, updateData) => {
  try {
    const notificationRef = doc(
      db,
      "users",
      uid,
      "notifications",
      notificationId,
    );
    await updateDoc(notificationRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating notification:", error);
    throw error;
  }
};

// Example usage functions for common notification types:

/**
 * Send a like notification
 */
export const sendLikeNotification = async (
  recipientUid,
  senderName,
  senderAvatar = "",
) => {
  return await pushNotificationToUser(recipientUid, {
    type: "like",
    title: `${senderName} liked your post`,
    message: "Your recent photo got a new like!",
    avatar: senderAvatar,
  });
};

/**
 * Send a comment notification
 */
export const sendCommentNotification = async (
  recipientUid,
  senderName,
  senderAvatar = "",
  postLink = "",
) => {
  return await pushNotificationToUser(recipientUid, {
    type: "comment",
    title: `${senderName} commented on your post`,
    message: "Check out what they had to say!",
    link: postLink,
    avatar: senderAvatar,
  });
};

export const sendConnectionRequestNotification = async (
  recipientUid,
  senderName,
  senderId,
  senderAvatar = "",
  senderUsername = "",
) => {
  return await pushNotificationToUser(recipientUid, {
    type: "connection_request",
    title: `${senderName} wants to connect`,
    message: `@${senderUsername} sent you a connection request. Accept to start networking!`,
    link: `profile/${senderId}`,
    senderId,
    avatar: senderAvatar,
  });
};

/**
 * Send a connection accepted notification
 */
export const sendConnectionAcceptedNotification = async (
  recipientUid,
  accepterName,
  accepterId,
  accepterAvatar = "",
  accepterUsername = "",
) => {
  return await pushNotificationToUser(recipientUid, {
    type: "connection_accepted",
    title: `${accepterName} accepted your connection request`,
    message: `You are now connected with @${accepterUsername}. Start networking!`,
    link: `profile/${accepterId}`,
    senderId: accepterId,
    avatar: accepterAvatar,
  });
};
