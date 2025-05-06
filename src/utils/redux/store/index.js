import { configureStore } from "@reduxjs/toolkit";
import taskStore from "../slices/taskSlice";
import commonStore from "../slices/commonSlice";

const store = configureStore({
  reducer: {
    taskStore,
    commonStore,
  },
});

export default store;
