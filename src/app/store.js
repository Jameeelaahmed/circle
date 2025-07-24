import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import profileData from "../features/userProfile/profileSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    profileData: profileData,
  },
});
export default store;
