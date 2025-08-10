import { createSlice } from "@reduxjs/toolkit";
import { fetchFromStorage, saveToStorage } from "../../helperFunctions";
import Cookies from "js-cookie";

interface AppState {
  isAuthenticated: boolean;
  userDetails: {
    empId: string;
    firstname: string;
    lastname: string;
    email: string;
    profileImage: string;
    role: string;
    permissions: string[];
  };
}

const initialState = {
  isAuthenticated: Cookies.get("access") ? true : false,
  userDetails: JSON.parse(fetchFromStorage("userDetails") ?? "{}"),
};
const authenticationSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsAuthenticated(state) {
      if (Cookies.get("access")) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
      saveToStorage("userDetails", JSON.stringify(action.payload));
    },
  },
});

export const { setIsAuthenticated, setUserDetails } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
export const isAuthenticated = (state: { authenticationSlice: AppState }) =>
  state.authenticationSlice.isAuthenticated;
export const userDetails = (state: { authenticationSlice: AppState }) =>
  state.authenticationSlice.userDetails;
