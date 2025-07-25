import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  location: "",
  joinDate: "",
  avatarPhoto: "",
  bio: "",
  connectionRequests: [],
  connections: [],
  coverPhoto: "",
  createdAt: "",
  email: "",
  interests: [""],
  isAdmin: false,
  joinedCircles: [],
  joninedEvents: [],
  phoneNumber: "",
  uid: "",
  username: "",
  stats: {
    circles: 0,
    connections: 0,
    events: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setProfileData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setProfileData } = userSlice.actions;
export default userSlice.reducer;
