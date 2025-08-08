import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationPresentational from "./NotificationPreseentional"; // Fixed typo
import { listenToNotifications } from "../../features/notifications/notificationsThunks";
import {
  stopListening,
  selectNotificationsLoading,
  selectNotificationsError,
} from "../../features/notifications/notificationsSlice";
import { getIsAuthenticated } from "../../features/user/userSlice";

const NotificationSection = () => {
  const dispatch = useDispatch();
  const unsubscribeRef = useRef(null);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const loading = useSelector(selectNotificationsLoading);
  const error = useSelector(selectNotificationsError);

  useEffect(() => {
    // Only start listening if user is authenticated
    if (isAuthenticated) {
      // Get the unsubscribe function from the thunk
      const unsubscribePromise = dispatch(listenToNotifications());

      // Handle the returned unsubscribe function
      if (unsubscribePromise && typeof unsubscribePromise === "function") {
        unsubscribeRef.current = unsubscribePromise;
      }
    }

    // Cleanup function
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current(); // Call Firestore unsubscribe
        unsubscribeRef.current = null;
      }

      dispatch(stopListening()); // Update Redux state
    };
  }, [dispatch, isAuthenticated]);

  // Show loading or error states if needed
  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error loading notifications: {error}</div>;
  }

  return (
    <div>
      <NotificationPresentational />
    </div>
  );
};

export default NotificationSection;
