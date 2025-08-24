// NotificationItem.jsx
import React from "react";
import { X, User } from "lucide-react";
import { getNotificationIcon } from "./notificationUtils";
import { timeAgo } from "../../utils/timeAgo";
import { useNavigate } from "react-router";

const NotificationItem = ({ notification, markAsRead, removeNotification }) => {
  const navigate = useNavigate();

  // Render message type notification
  const renderMessageNotification = () => {
    // Extract sender name from title (format: "Message from username")
    const senderName =
      notification.title?.replace("Message from ", "") || "Unknown User";

    return (
      <div className="flex items-start space-x-3">
        {/* Sender Avatar */}
        <div className="flex-shrink-0">
          {notification.avatar && notification.avatar.trim() ? (
            <img
              src={notification.avatar}
              alt={senderName}
              className="h-10 w-10 rounded-full object-cover"
              style={{ border: `2px solid var(--color-primary)` }}
            />
          ) : (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--color-primary)", opacity: 0.8 }}
            >
              <User className="h-5 w-5 text-text" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Sender name and circle name */}
              <div className="flex items-center space-x-2">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-light)" }}
                >
                  {senderName}
                </p>
                {notification.circleName && (
                  <span
                    className="rounded-full px-3 py-1 text-sm font-medium"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                      color: "var(--color-primary)",
                    }}
                  >
                    in {notification.circleName}
                  </span>
                )}
              </div>
              <p
                className="mt-1 line-clamp-2 text-sm"
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
                {timeAgo(notification.createdAt)}
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

          {/* Unread indicator for messages */}
          {(!notification.read || !notification.isRead) && (
            <div
              className="absolute top-6 left-2 h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          )}
        </div>
      </div>
    );
  };

  // Render default notification (non-message types)
  const renderDefaultNotification = () => (
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
            <p className="mt-1 text-sm" style={{ color: "var(--color-text)" }}>
              {notification.message}
            </p>
            <p
              className="mt-2 text-xs"
              style={{
                color: "color-mix(in srgb, var(--color-text) 70%, transparent)",
              }}
            >
              {timeAgo(notification.createdAt)}
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
        {(!notification.read || !notification.isRead) && (
          <div
            className="absolute top-6 left-2 h-2 w-2 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`hover:bg-opacity-50 group relative cursor-pointer border-b p-4 transition-all duration-200 ${!notification.read ? "bg-opacity-30" : ""
        }`}
      style={{
        borderColor: "color-mix(in srgb, var(--color-text) 10%, transparent)",
        backgroundColor: !notification.read
          ? notification.type === "message"
            ? "color-mix(in srgb, var(--color-primary) 3%, transparent)"
            : "color-mix(in srgb, var(--color-primary) 5%, transparent)"
          : "transparent",
      }}
      onClick={() => {
        markAsRead(notification.id);
        navigate(`/${notification.link}`);
      }}
    >
      {notification.type === "message"
        ? renderMessageNotification()
        : renderDefaultNotification()}
    </div>
  );
};

export default NotificationItem;
