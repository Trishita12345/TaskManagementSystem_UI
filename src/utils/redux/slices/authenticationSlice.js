import { createSlice } from "@reduxjs/toolkit";
import { priviledges } from "../../../constants/priviledges";

const initialState = {
  isAuthenticated: true,
  email: "trishita.majumder@gmail.com",
  firstName: "Trishita",
  lastName: "Majumder",
  userPriviledges: [
    priviledges.view_manage_employees,
    priviledges.view_task,
    priviledges.add_task,
    priviledges.edit_task,
    priviledges.delete_task,
    priviledges.view_project,
    priviledges.add_project,
    priviledges.edit_project,
    priviledges.delete_project,
  ],
};
const authenticationSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
});

// export const { setIsLoading, setMessage, setIsDark } = authenticationSlice.actions;
export default authenticationSlice.reducer;
