import type { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import type { themeType } from "../../../constants/types";

interface AppState {
  isLoading: boolean;
  isDark: boolean;
  isSidebarOpen: boolean;
  message: {
    display: boolean;
    severity: AlertColor;
    message: React.ReactNode;
    duration?: number;
  };
  theme: themeType;
}

const initialState = {
  isLoading: false,
  isDark: localStorage.getItem("isDark") === "true" ? true : false,
  isSidebarOpen: true,
  message: {
    display: false,
    severity: "success",
    message: "",
  },
  theme: localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme") as string)
    : {
        primary: "#0c57c7",
        primaryTextColor: "#ffffff",
        secondaryColor1: "#ffffff",
        secondaryColor2: "#f7f9fcff",
        secondaryColor3: "#d3d8deff",
        inputBgColor: "#ffffff",
        secondaryContrast: "#000000ff",
        textEditorBgColor: "#ffffff",
        textEditorColor: "#000000",
        opacity: "20",
      },
};
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsSidebarOpen(state, action) {
      state.isSidebarOpen = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setIsDark(state, action) {
      state.isDark = action.payload;
      let theme;
      if (action.payload) {
        //dark mode
        theme = {
          primary: "#0c57c7",
          primaryTextColor: "#e2e2e2ff",
          secondaryColor1: "#2b2b2bff",
          secondaryColor2: "#1F2022",
          secondaryColor3: "#35393F",
          inputBgColor: "#a5a3a3ff",
          secondaryContrast: "#e2e2e2ff",
          opacity: "95",
          textEditorBgColor: "#000000",
          textEditorColor: "#ffffff",
        };
      } else {
        //light mode
        theme = {
          primary: "#0c57c7",
          primaryTextColor: "#ffffff",
          secondaryColor1: "#ffffff",
          secondaryColor2: "#f7f9fcff",
          secondaryColor3: "#d3d8deff",
          inputBgColor: "#ffffff",
          secondaryContrast: "#000000ff",
          opacity: "20",
          textEditorBgColor: "#ffffff",
          textEditorColor: "#000000",
        };
      }
      state.theme = theme;
      localStorage.setItem("theme", JSON.stringify(theme));
      localStorage.setItem("isDark", action.payload ? "true" : "false");
    },
  },
});

export const { setIsLoading, setMessage, setIsDark, setIsSidebarOpen } =
  commonSlice.actions;
export default commonSlice.reducer;
export const isDark = (state: { commonSlice: AppState }) =>
  state.commonSlice.isDark;
export const getTheme = (state: { commonSlice: AppState }) =>
  state.commonSlice.theme;

export const notificationMessage = (state: { commonSlice: AppState }) =>
  state.commonSlice.message;
export const loading = (state: { commonSlice: AppState }) =>
  state.commonSlice.isLoading;

export const sidebarOpen = (state: { commonSlice: AppState }) =>
  state.commonSlice.isSidebarOpen;
