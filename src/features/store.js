import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
const store = configureStore({
  reducer: {
    userSlice,
  },
});
export default store;