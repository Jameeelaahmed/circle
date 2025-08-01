// NotificationItem.jsx
import React from "react";
import { X } from "lucide-react";
import { getNotificationIcon } from "./notificationUtils";

const NotificationItem = ({ notification, markAsRead, removeNotification }) => {
  return (
    <div
      className={`hover:bg-opacity-50 group relative cursor-pointer border-b p-4 transition-all duration-200 ${
        !notification.isRead ? "bg-opacity-30" : ""
      }`}
      style={{
        borderColor: "color-mix(in srgb, var(--color-text) 10%, transparent)",
        backgroundColor: !notification.isRead
          ? "color-mix(in srgb, var(--color-primary) 5%, transparent)"
          : "transparent",
      }}
      onClick={() => markAsRead(notification.id)}
    >
      <div className="flex items-start space-x-3">
        {/* Avatar or Icon */}
        <div className="flex-shrink-0">
          {notification.avatar ? (
            <img
              src={notification.avatar}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
              style={{ border: `2px solid var(--color-primary)` }}
            />
          ) : (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--color-glass)" }}
            >
              {getNotificationIcon(notification.type)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p
                className="text-sm font-medium"
                style={{ color: "var(--color-light)" }}
              >
                {notification.title}
              </p>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--color-text)" }}
              >
                {notification.message}
              </p>
              <p
                className="mt-2 text-xs"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-text) 70%, transparent)",
                }}
              >
                {notification.time}
              </p>
            </div>

            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNotification(notification.id);
              }}
              className="hover:bg-opacity-20 rounded-full p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ color: "var(--color-text)" }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Unread indicator */}
          {!notification.isRead && (
            <div
              className="absolute top-6 left-2 h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
