import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "../slices/taskSlice";
import commonSlice from "../slices/commonSlice";
import authenticationSlice from "../slices/authenticationSlice";

const store = configureStore({
  reducer: {
    taskSlice,
    commonSlice,
    authenticationSlice,
  },
});

export default store;
