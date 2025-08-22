import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFromStorage,
  saveToStorage,
} from "../../helperFunctions/storageHelperFunctions";
import Cookies from "js-cookie";
import type {
  EmployeeSummaryType,
  ProjectDetailsType,
} from "../../../constants/types";

interface userDetails extends EmployeeSummaryType {
  permissions: string[];
}
interface AppState {
  isAuthenticated: boolean;
  selectedProject: ProjectDetailsType;
  userDetails: userDetails;
}

const initialState = {
  isAuthenticated: Cookies.get("access") ? true : false,
  userDetails: JSON.parse(fetchFromStorage("userDetails") ?? "{}"),
  selectedProject: JSON.parse(fetchFromStorage("selectedProject") ?? "{}"),
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
    setSelectedProject(state, action) {
      state.selectedProject = action.payload;
      saveToStorage("selectedProject", JSON.stringify(action.payload));
    },
  },
});

export const { setIsAuthenticated, setUserDetails, setSelectedProject } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
export const isAuthenticated = (state: { authenticationSlice: AppState }) =>
  state.authenticationSlice.isAuthenticated;
export const userDetails = (state: { authenticationSlice: AppState }) =>
  state.authenticationSlice.userDetails;
export const selectedProjectDetails = (state: {
  authenticationSlice: AppState;
}) => state.authenticationSlice.selectedProject;
