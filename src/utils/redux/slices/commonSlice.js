import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: {
    message: "",
    type: "",
  },
};

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
  },
});

export const { setIsLoading, setMessage } = commonSlice.actions;
export default commonSlice.reducer;
