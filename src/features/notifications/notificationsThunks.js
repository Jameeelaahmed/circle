import {
  collection,
  onSnapshot,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { getUserInfo } from "../user/userSlice";
import {
  startListening,
  setNotifications,
  setError,
  setUnsubscribe,
  stopListening,
} from "./notificationsSlice";

// Helper function to serialize Firestore data - defined inline to avoid import issues
const serializeFirestoreData = (data) => {
  if (!data) return data;

  // Handle Firestore Timestamp objects
  if (data && typeof data.toDate === "function") {
    return data.toDate().toISOString();
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map((item) => serializeFirestoreData(item));
  }

  // Handle plain objects
  if (data && typeof data === "object" && data.constructor === Object) {
    const serialized = {};
    for (const [key, value] of Object.entries(data)) {
      serialized[key] = serializeFirestoreData(value);
    }
    return serialized;
  }

  // Return primitive values as-is
  return data;
};

export const listenToNotifications = () => (dispatch, getState) => {
  const userInfo = getUserInfo(getState());

  if (!userInfo?.uid) {
    return;
  }

  dispatch(startListening());

  // Create reference to notifications subcollection
  const notificationsRef = collection(
    db,
    "users",
    userInfo.uid,
    "notifications",
  );

  // Create query to order notifications (you can customize this)
  // Common options: orderBy("createdAt", "desc") for newest first
  // or orderBy("createdAt", "asc") for oldest first
  const notificationsQuery = query(
    notificationsRef,
    orderBy("createdAt", "desc"), // Change this based on your needs
  );

  const unsubscribe = onSnapshot(
    notificationsQuery,
    (snapshot) => {
      const notifications = [];

      snapshot.forEach((doc) => {
        // Include the document ID along with the data
        const notificationData = {
          id: doc.id,
          ...doc.data(),
        };

        notifications.push(notificationData);
      });

      // Serialize the notifications to make them Redux-compatible
      const serializedNotifications = serializeFirestoreData(notifications);

      dispatch(setNotifications(serializedNotifications));
    },
    (error) => {
      console.error("Notifications listener error:", error);
      dispatch(setError(error.message));
    },
  );

  // Store unsubscribe function reference (not the function itself)
  dispatch(setUnsubscribe("active"));

  // Return cleanup function to be called by component
  return unsubscribe;
};

// Alternative approach - keeping for backwards compatibility
export const listenToUserNotifications = () => (dispatch, getState) => {
  // This is now the same as listenToNotifications above
  return dispatch(listenToNotifications());
};
