import { useSelector } from "react-redux";
import NotificationDropdown from "../../components/NotificationComponents/NotificationDropdown";
import {
  selectNotifications,
  selectUnreadCount,
  selectNotificationsLoading,
} from "../../features/notifications/notificationsSlice";

const NotificationPresentational = () => {
  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadCount);
  const loading = useSelector(selectNotificationsLoading);
  return (
    <div>
      <NotificationDropdown
        notifications={notifications}
        unreadCount={unreadCount}
        loading={loading}
      />
    </div>
  );
};

export default NotificationPresentational;
