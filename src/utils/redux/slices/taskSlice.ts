import { createSlice } from "@reduxjs/toolkit";
import type { dropdownDataProps } from "../../../constants/types";

interface appState {
  statusList: dropdownDataProps[];
  tasks: any[];
  taskFilterQuery: string;
  empIdsForFilter: any[];
}

const initialState: appState = {
  statusList: [],
  tasks: [],
  taskFilterQuery: "",
  empIdsForFilter: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setStatusList(state, action) {
      state.statusList = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    setTaskFilterQuery(state, action) {
      state.taskFilterQuery = action.payload;
    },
    setEmpIdsForFilter(state, action) {
      if (state.empIdsForFilter.includes(action.payload)) {
        state.empIdsForFilter = state.empIdsForFilter.filter(
          (s) => s !== action.payload
        );
      } else {
        state.empIdsForFilter = [...state.empIdsForFilter, action.payload];
      }
    },
    setOnlyCurrentEmpIdForFilter(state, action) {
      state.empIdsForFilter = [action.payload];
    },
    setClearFilter(state) {
      state.taskFilterQuery = "";
      state.empIdsForFilter = [];
    },
  },
});

export const {
  setTasks,
  setStatusList,
  setEmpIdsForFilter,
  setOnlyCurrentEmpIdForFilter,
  setClearFilter,
  setTaskFilterQuery,
} = taskSlice.actions;
export default taskSlice.reducer;

export const statuses = (state: { taskSlice: appState }) =>
  state.taskSlice.statusList;
export const selectedEmployeeIds = (state: { taskSlice: appState }) =>
  state.taskSlice.empIdsForFilter;
export const taskQuery = (state: { taskSlice: appState }) =>
  state.taskSlice.taskFilterQuery;
export const tasks = (state: { taskSlice: appState }) => state.taskSlice.tasks;
