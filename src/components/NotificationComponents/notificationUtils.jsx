// notificationUtils.js
import React from "react";
import { Heart, UserPlus, MessageCircle, Calendar, Bell } from "lucide-react";

export const getNotificationIcon = (type) => {
  switch (type) {
    case "like":
      return (
        <Heart className="h-4 w-4" style={{ color: "var(--color-accent)" }} />
      );
    case "follow":
      return (
        <UserPlus
          className="h-4 w-4"
          style={{ color: "var(--color-primary)" }}
        />
      );
    case "message":
      return (
        <MessageCircle
          className="h-4 w-4"
          style={{ color: "var(--color-secondary)" }}
        />
      );
    case "event":
      return (
        <Calendar
          className="h-4 w-4"
          style={{ color: "var(--color-primary)" }}
        />
      );
    default:
      return (
        <Bell className="h-4 w-4" style={{ color: "var(--color-text)" }} />
      );
  }
};
