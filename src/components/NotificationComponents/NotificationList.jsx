// NotificationList.jsx
import React from "react";
import { Bell } from "lucide-react";
import NotificationItem from "./NotificationItem";

const NotificationList = ({
  notifications,
  unreadCount,
  markAsRead,
  removeNotification,
  markAllAsRead,
}) => {
  return (
    <>
      {/* Header */}
      <div
        className="flex items-center bg-gradient-to-b from-bg-primary to-bg-secondary justify-between border-b p-4"
        style={{
          borderColor: "color-mix(in srgb, var(--color-text) 20%, transparent)",
        }}
      >
        <h3
          className="text-lg font-semibold"
          style={{
            color: "var(--color-text)",
            fontFamily: "var(--font-primary)",
          }}
        >
          Notifications
        </h3>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm font-medium transition-colors duration-200 hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div
        className="max-h-96 bg-gradient-to-b from-bg-primary to-bg-secondary overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell
              className="mx-auto mb-3 h-12 w-12 opacity-50"
              style={{ color: "var(--color-text)" }}
            />
            <p style={{ color: "var(--color-text)" }}>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              markAsRead={markAsRead}
              removeNotification={removeNotification}
            />
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div
          className="border-t bg-gradient-to-b from-bg-primary to-bg-secondary p-3 text-center"
          style={{
            borderColor:
              "color-mix(in srgb, var(--color-text) 20%, transparent)",
          }}
        >
          <button
            className="text-sm font-medium transition-colors duration-200 hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            View all notifications
          </button>
        </div>
      )}
    </>
  );
};

export default NotificationList;
