import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import NotificationList from "./NotificationList";
import {
  markNotificationAsRead,
  deleteNotification,
} from "../../fire_base/notificationController/notificationController";
import { useAuth } from "../../hooks/useAuth";
const NotificationDropdown = ({ notifications, loading }) => {
  const { userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  // const [notifications, setNotifications] = useState(sampleNotifications);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (NotificationId) => {
    markNotificationAsRead(userId, NotificationId);
  };

  const removeNotification = (id) => {
    deleteNotification(userId, id);
  };

  const markAllAsRead = () => { };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-2 transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: "var(--color-glass)",
          backdropFilter: "blur(10px)",
          border: `1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)`,
          boxShadow: isOpen
            ? "var(--shadow-btnPrimaryHover)"
            : "var(--shadow-card)",
        }}
      >
        <Bell
          className="h-5 w-5"
          style={{
            color: isOpen ? "var(--color-primary)" : "var(--color-text)",
          }}
        />

        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] animate-pulse items-center justify-center rounded-full text-xs font-bold text-text"
            style={{
              backgroundColor: "var(--color-accent)",
              fontSize: "10px",
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-50 mt-2 w-80 rounded-lg shadow-2xl"
          style={{
            backgroundColor: "var(--color-dark)",
            border: `1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)`,
            boxShadow: "var(--shadow-glassCard)",
            backdropFilter: "blur(20px)",
            animation: "var(--animate-fade-slide-in)",
          }}
        >
          <NotificationList
            notifications={notifications}
            unreadCount={unreadCount}
            markAsRead={markAsRead}
            removeNotification={removeNotification}
            markAllAsRead={markAllAsRead}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
