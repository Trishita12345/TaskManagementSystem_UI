import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = taskSlice.actions;
export default taskSlice.reducer;
