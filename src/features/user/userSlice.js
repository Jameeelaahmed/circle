import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userInfo: null,
  token: null,
  isAuthenticated: undefined,
  isAuthLoading: true
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUserInfo(state, action) {
      const { user, token } = action.payload;
      // Store only serializable user data
      state.userInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
      state.token = token;
      state.isAuthenticated = true;
      state.isAuthLoading = false;
    },
    clearUserInfo(state) {
      state.userInfo = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAuthLoading = false;
    },
    setAuthLoading(state, action) {
      state.isAuthLoading = action.payload;
    }
  },
});

export const { setUserInfo, clearUserInfo, setAuthLoading } = userSlice.actions;
export const getUserInfo = (state) => state.user.userInfo;
export const getToken = (state) => state.user.token;
export const getIsAuthenticated = (state) => state.user.isAuthenticated;
export default userSlice.reducer;
