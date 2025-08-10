import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isLoading: boolean;
  isDark: boolean;
  message: {
    message: string;
    type: string;
  };
  theme: any;
  // {
  //   primary: string;
  //   primaryTextColor: string;
  //   secondary: string;
  //   secondaryTextColor: string;
  //   logoBackgroundColor: string;
  // };
}

const initialState = {
  isLoading: false,
  isDark: localStorage.getItem("isDark") === "true" ? true : false,
  message: {
    message: "",
    type: "",
  },
  theme: localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme") as string)
    : {
        primary: "#7b23ff",
        primaryTextColor: "#ffffff",
        secondaryColor1: "#ffffff",
        secondaryColor2: "#e8edf2ff",
        secondaryColor3: "#d3d8deff",
        inputBgColor: "#ffffff",
        secondaryContrast: "#000000ff",
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
    setIsDark(state, action) {
      state.isDark = action.payload;
      let theme;
      if (action.payload) {
        //dark mode
        theme = {
          primary: "#7b23ff",
          primaryTextColor: "#ffffff",
          secondaryColor1: "#2b2b2bff",
          secondaryColor2: "#5e5d5dff",
          secondaryColor3: "#a5a3a3ff",
          inputBgColor: "#a5a3a3ff",
          secondaryContrast: "#ffffff",
        };
      } else {
        //light mode
        theme = {
          primary: "#7b23ff",
          primaryTextColor: "#ffffff",
          secondaryColor1: "#ffffff",
          secondaryColor2: "#e8edf2ff",
          secondaryColor3: "#d3d8deff",
          inputBgColor: "#ffffff",
          secondaryContrast: "#000000ff",
        };
      }
      state.theme = theme;
      localStorage.setItem("theme", JSON.stringify(theme));
      localStorage.setItem("isDark", action.payload ? "true" : "false");
    },
  },
});

export const { setIsLoading, setMessage, setIsDark } = commonSlice.actions;
export default commonSlice.reducer;
export const isDark = (state: { commonSlice: AppState }) =>
  state.commonSlice.isDark;
export const getTheme = (state: { commonSlice: AppState }) =>
  state.commonSlice.theme;
