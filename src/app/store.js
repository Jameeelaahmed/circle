import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import profileData from "../features/userProfile/profileSlice";
import circlesSlice from '../features/circles/circlesSlice'
const store = configureStore({
  reducer: {
    user: userSlice,
    profileData: profileData,
    circles: circlesSlice
  },
});
export default store;
