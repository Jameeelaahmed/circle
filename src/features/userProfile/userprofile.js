import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase-config";
import { db } from "../../firebase-config";
const INITIAL_STATE = {
  userInfo: {
    uid: "",
    displayName: "",
    email: "",
    photoURL: "",
  },
};

const userProfileSlice = createSlice({
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
