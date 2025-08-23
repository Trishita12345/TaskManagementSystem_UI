import { createSlice } from "@reduxjs/toolkit";
import type { dropdownDataProps, TaskSummary } from "../../../constants/types";
import {
  fetchFromStorage,
  saveToStorage,
} from "../../helperFunctions/storageHelperFunctions";

interface appState {
  statusList: dropdownDataProps[];
  priorityList: dropdownDataProps[];
  taskTypeList: dropdownDataProps[];
  tasks: TaskSummary[];
  empIdsForFilter: string[];
}

const initialState: appState = {
  statusList: [],
  priorityList: [],
  taskTypeList: [],
  tasks: [],
  empIdsForFilter: JSON.parse(fetchFromStorage("empIdsForFilter") ?? "[]"),
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setStatusList(state, action) {
      state.statusList = action.payload;
    },
    setPriorityList(state, action) {
      state.priorityList = action.payload;
    },
    setTaskTypeList(state, action) {
      state.taskTypeList = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    setEmpIdsForFilter(state, action) {
      let filteredList;
      if (state.empIdsForFilter.includes(action.payload)) {
        filteredList = state.empIdsForFilter.filter(
          (s) => s !== action.payload
        );
      } else {
        filteredList = [...state.empIdsForFilter, action.payload];
      }
      state.empIdsForFilter = filteredList;
      saveToStorage("empIdsForFilter", JSON.stringify(filteredList));
    },
    setOnlyCurrentEmpIdForFilter(state, action) {
      state.empIdsForFilter = [action.payload];
      saveToStorage("empIdsForFilter", JSON.stringify(action.payload));
    },
    setClearFilter(state) {
      state.empIdsForFilter = [];
      saveToStorage("empIdsForFilter", JSON.stringify([]));
    },
  },
});

export const {
  setTasks,
  setStatusList,
  setEmpIdsForFilter,
  setOnlyCurrentEmpIdForFilter,
  setClearFilter,
  setPriorityList,
  setTaskTypeList,
} = taskSlice.actions;
export default taskSlice.reducer;

export const statuses = (state: { taskSlice: appState }) =>
  state.taskSlice.statusList;
export const selectedEmployeeIds = (state: { taskSlice: appState }) =>
  state.taskSlice.empIdsForFilter;
export const priorityList = (state: { taskSlice: appState }) =>
  state.taskSlice.priorityList;
export const taskTypeList = (state: { taskSlice: appState }) =>
  state.taskSlice.taskTypeList;
export const tasks = (state: { taskSlice: appState }) => state.taskSlice.tasks;
