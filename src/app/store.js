import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import profileData from "../features/userProfile/profileSlice";
import circlesSlice from "../features/circles/circlesSlice";
import circleMembersSlice from "../features/circleMembers/circleMembersSlice";
import notificationsSlice from "../features/notifications/notificationsSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    profileData: profileData,
    circles: circlesSlice,
    members: circleMembersSlice,
    notifications: notificationsSlice,
  },
});
export default store;
