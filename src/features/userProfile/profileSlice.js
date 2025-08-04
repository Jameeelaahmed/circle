import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../../fire_base/profileController/profileController";

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

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (profileId, thunkAPI) => {
    try {
      const profile = await getUserProfile(profileId);
      return profile;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      });
  },
});

export const { setProfileData } = userSlice.actions;
export default userSlice.reducer;
