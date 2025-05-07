import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isDark: localStorage.getItem("isDark") === "true" ? true : false,
  message: {
    message: "",
    type: "",
  },
};
console.log("r:", initialState.isDark);
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setIsDark(state, action) {
      state.isDark = action.payload;
      localStorage.setItem("isDark", action.payload ? "true" : "false");
    },
  },
});

export const { setIsLoading, setMessage, setIsDark } = commonSlice.actions;
export default commonSlice.reducer;
