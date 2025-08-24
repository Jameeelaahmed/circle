import React, { useState } from "react";
import { X, User, Check, UserPlus } from "lucide-react";
import { timeAgo } from "../../utils/timeAgo";
import { useNavigate } from "react-router";
import { updateUserProfile } from "../../fire_base/profileController/profileController";
import { sendConnectionAcceptedNotification } from "../../fire_base/notificationController/notificationController";
import { auth } from "../../firebase-config";
import { getUserProfile } from "../../fire_base/profileController/profileController";
const ConnectionNotificationItem = ({
  notification,
  markAsRead,
  removeNotification,
  currentUserProfile,
}) => {
  const navigate = useNavigate();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const handleAcceptConnection = async (e) => {
    e.stopPropagation();

    if (isAccepting || isAccepted || isRejected) return;

    setIsAccepting(true);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("No current user found");
        return;
      }

      // Get sender's profile first to get their current connections
      const senderProfile = await getUserProfile(notification.senderId);
      if (!senderProfile) {
        console.error("Sender profile not found");
        return;
      }

      // Prepare connection arrays
      const currentUserConnections = currentUserProfile?.connections || [];
      const senderConnections = senderProfile?.connections || [];

      // Check if connection already exists to avoid duplicates
      if (currentUserConnections.includes(notification.senderId)) {
        console.log("Connection already exists");
        setIsAccepted(true);
        markAsRead(notification.id);
        setTimeout(() => removeNotification(notification.id), 2000);
        return;
      }

      // Update current user's connections (add sender)
      const updatedCurrentUserConnections = [
        ...currentUserConnections,
        notification.senderId,
      ];

      // Update sender's connections (add current user)
      const updatedSenderConnections = [...senderConnections, currentUser.uid];

      // Update both profiles
      await Promise.all([
        updateUserProfile(currentUser.uid, {
          connections: updatedCurrentUserConnections,
        }),
        updateUserProfile(notification.senderId, {
          connections: updatedSenderConnections,
        }),
      ]);

      // Send acceptance notification to the requester
      await sendConnectionAcceptedNotification(
        notification.senderId,
        currentUserProfile?.displayName ||
          currentUserProfile?.username ||
          "Someone",
        currentUser.uid,
        currentUserProfile?.photoUrl || "",
        currentUserProfile?.username || "",
      );

      setIsAccepted(true);

      // Mark the notification as read
      markAsRead(notification.id);

      // Remove the notification after a delay
      setTimeout(() => {
        removeNotification(notification.id);
      }, 3000);
    } catch (error) {
      console.error("Error accepting connection:", error);
      // You might want to show an error message to the user here
      // setErrorMessage("Failed to accept connection. Please try again.");
    } finally {
      setIsAccepting(false);
    }
  };

  const handleRejectConnection = async (e) => {
    e.stopPropagation();

    if (isRejecting || isAccepted || isRejected) return;

    setIsRejecting(true);

    try {
      // Mark as rejected and show feedback
      setIsRejected(true);

      // Mark the notification as read
      markAsRead(notification.id);

      // Optionally, you might want to store rejection information
      // or send a rejection notification to the sender
      // await sendConnectionRejectedNotification(notification.senderId, ...);

      // Remove the notification after showing rejection feedback
      setTimeout(() => {
        removeNotification(notification.id);
      }, 2000);
    } catch (error) {
      console.error("Error rejecting connection:", error);
      // Handle error appropriately
    } finally {
      setIsRejecting(false);
    }
  };

  const renderConnectionRequest = () => {
    const senderName =
      notification.title?.replace(" wants to connect", "") || "Unknown User";

    return (
      <div className="flex items-start space-x-3">
        {/* Sender Avatar */}
        <div className="flex-shrink-0">
          {notification.avatar && notification.avatar.trim() ? (
            <img
              src={notification.avatar}
              alt={senderName}
              className="h-12 w-12 rounded-full object-cover"
              style={{ border: `2px solid var(--color-primary)` }}
            />
          ) : (
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--color-primary)", opacity: 0.8 }}
            >
              <User className="h-6 w-6 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <UserPlus
                  className="h-4 w-4"
                  style={{ color: "var(--color-primary)" }}
                />
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-light)" }}
                >
                  {notification.title}
                </p>
              </div>

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
                {timeAgo(notification.createdAt)}
              </p>

              {/* Enhanced Action Buttons */}
              <div className="mt-4 flex space-x-3">
                {!isAccepted && !isRejected ? (
                  <>
                    {/* Accept Button */}
                    <button
                      onClick={handleAcceptConnection}
                      disabled={isAccepting || isRejecting}
                      className={`flex items-center justify-center space-x-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isAccepting || isRejecting
                          ? "cursor-not-allowed opacity-50"
                          : "hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
                      }`}
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      {isAccepting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Accepting...</span>
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4 stroke-[2.5]" />
                          <span>Accept</span>
                        </>
                      )}
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={handleRejectConnection}
                      disabled={isAccepting || isRejecting}
                      className={`flex items-center justify-center space-x-2 rounded-lg border-2 px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                        isAccepting || isRejecting
                          ? "cursor-not-allowed opacity-50"
                          : "hover:scale-[1.02] active:scale-[0.98]"
                      }`}
                      style={{
                        borderColor: "#ef4444",
                        color: "#ef4444",
                        backgroundColor: "transparent",
                        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.1)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isAccepting && !isRejecting) {
                          e.target.style.backgroundColor =
                            "rgba(239, 68, 68, 0.05)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      {isRejecting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                          <span>Rejecting...</span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 stroke-[2.5]" />
                          <span>Reject</span>
                        </>
                      )}
                    </button>
                  </>
                ) : isAccepted ? (
                  <div
                    className="flex items-center space-x-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium"
                    style={{
                      color: "#16a34a",
                      backgroundColor:
                        "color-mix(in srgb, #16a34a 10%, transparent)",
                    }}
                  >
                    <Check className="h-4 w-4 stroke-[2.5]" />
                    <span>Connection Accepted</span>
                  </div>
                ) : (
                  <div
                    className="flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium"
                    style={{
                      color: "#ef4444",
                      backgroundColor:
                        "color-mix(in srgb, #ef4444 10%, transparent)",
                    }}
                  >
                    <X className="h-4 w-4 stroke-[2.5]" />
                    <span>Connection Rejected</span>
                  </div>
                )}
              </div>
            </div>

            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNotification(notification.id);
              }}
              className="hover:bg-opacity-10 rounded-full p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-white"
              style={{ color: "var(--color-text)" }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Unread indicator */}
          {!notification.read && !notification.isRead && (
            <div
              className="absolute top-6 left-2 h-3 w-3 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
            />
          )}
        </div>
      </div>
    );
  };

  const renderConnectionAccepted = () => {
    const accepterName =
      notification.title?.replace(" accepted your connection request", "") ||
      "Someone";

    return (
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {notification.avatar && notification.avatar.trim() ? (
            <img
              src={notification.avatar}
              alt={accepterName}
              className="h-10 w-10 rounded-full object-cover"
              style={{ border: `2px solid var(--color-accent)` }}
            />
          ) : (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--color-accent)", opacity: 0.8 }}
            >
              <Check className="h-5 w-5 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Check
                  className="h-4 w-4"
                  style={{ color: "var(--color-accent)" }}
                />
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--color-light)" }}
                >
                  {notification.title}
                </p>
              </div>

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
                {timeAgo(notification.createdAt)}
              </p>
            </div>

            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNotification(notification.id);
              }}
              className="hover:bg-opacity-10 rounded-full p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-white"
              style={{ color: "var(--color-text)" }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Unread indicator */}
          {!notification.read && !notification.isRead && (
            <div
              className="absolute top-6 left-2 h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`group hover:bg-opacity-50 relative cursor-pointer border-b p-4 transition-all duration-200 ${
        !notification.read ? "bg-opacity-30" : ""
      }`}
      style={{
        borderColor: "color-mix(in srgb, var(--color-text) 10%, transparent)",
        backgroundColor: !notification.read
          ? notification.type === "connection_request"
            ? "color-mix(in srgb, var(--color-primary) 5%, transparent)"
            : "color-mix(in srgb, var(--color-accent) 3%, transparent)"
          : "transparent",
      }}
      onClick={() => {
        if (notification.type === "connection_accepted") {
          markAsRead(notification.id);
          navigate(`/${notification.link}`);
        }
        // Don't navigate on connection_request click to avoid interference with buttons
      }}
    >
      {notification.type === "connection_request"
        ? renderConnectionRequest()
        : renderConnectionAccepted()}
    </div>
  );
};

export default ConnectionNotificationItem;
