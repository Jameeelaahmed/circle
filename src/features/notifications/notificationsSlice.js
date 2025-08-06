import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
  isListening: false, // Track listening state instead of storing function
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    startListening: (state) => {
      console.log("Starting notifications listener");
      state.loading = true;
      state.error = null;
      state.isListening = true;
    },

    setNotifications: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isListening = false;
    },

    setUnsubscribe: (state, action) => {
      // Just track that we have an active listener
      state.isListening = action.payload === "active";
    },

    stopListening: (state) => {
      state.loading = false;
      state.isListening = false;
      state.error = null;
    },

    // Additional helper actions
    clearNotifications: (state) => {
      state.data = [];
    },

    markNotificationRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.data.find((n) => n.id === notificationId);
      if (notification) {
        notification.read = true;
      }
    },

    markAllNotificationsRead: (state) => {
      state.data.forEach((notification) => {
        notification.read = true;
      });
    },

    removeNotification: (state, action) => {
      const notificationId = action.payload;
      state.data = state.data.filter((n) => n.id !== notificationId);
    },
  },
});

export const {
  startListening,
  setNotifications,
  setError,
  setUnsubscribe,
  stopListening,
  clearNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  removeNotification,
} = notificationsSlice.actions;

// Selectors with defensive checks
export const selectNotifications = (state) => state.notifications?.data || [];
export const selectNotificationsLoading = (state) =>
  state.notifications?.loading || false;
export const selectNotificationsError = (state) =>
  state.notifications?.error || null;
export const selectIsListening = (state) =>
  state.notifications?.isListening || false;
export const selectUnreadCount = (state) =>
  (state.notifications?.data || []).filter((n) => !n.read).length;

export default notificationsSlice.reducer;
