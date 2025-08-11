import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../../fire_base/profileController/profileController";

const INITIAL_STATE = {
  status: "idle",
  error: null,
  profile: null,
  viewedProfile: null,
  // Add other initial profile fields if needed
};

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (profileId, thunkAPI) => {
    try {
      const profile = await getUserProfile(profileId);
      const transformedProfile = {
        ...profile,
        createdAt: profile.createdAt?.toDate?.() ? profile.createdAt.toDate().toISOString() : profile.createdAt ?? null,
        updatedAt: profile.updatedAt?.toDate?.() ? profile.updatedAt.toDate().toISOString() : profile.updatedAt ?? null,
      };
      return transformedProfile;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchViewedProfile = createAsyncThunk(
  "userProfile/fetchViewedProfile",
  async (profileId, thunkAPI) => {
    try {
      const profile = await getUserProfile(profileId);
      const transformedProfile = {
        ...profile,
        createdAt: profile.createdAt?.toDate?.() ? profile.createdAt.toDate().toISOString() : profile.createdAt ?? null,
        updatedAt: profile.updatedAt?.toDate?.() ? profile.updatedAt.toDate().toISOString() : profile.updatedAt ?? null,
      };
      return transformedProfile;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "userProfile",
  initialState: INITIAL_STATE,
  reducers: {
    setProfileData(state, action) {
      Object.assign(state, action.payload);
    },
    setUserInfo(state, action) {
      const { email, username, photoURL, phoneNumber } = action.payload;
      state.email = email ?? state.email;
      state.username = username ?? state.username;
      state.avatarPhoto = photoURL ?? state.avatarPhoto;
      state.phoneNumber = phoneNumber ?? state.phoneNumber;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchViewedProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchViewedProfile.fulfilled, (state, action) => {
        state.viewedProfile = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchViewedProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setProfileData, setUserInfo } = profileSlice.actions;
export const getProfileData = (state) => state.userProfile.profile;
export default profileSlice.reducer;