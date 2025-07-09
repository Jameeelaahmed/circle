import { useSelector } from "react-redux";

import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase-config";

const INITIAL_STATE = {
  userInfo: auth.currentUser,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export const getUserInfo = () => useSelector((state) => state.userSlice.user);
export default userSlice.reducer;
