import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusList: [],
  employeeList: [],
  tasksWithoutFilter: [],
  tasks: [],
  taskById: {},
  selectedIdForView: null,
  selectedIdForEdit: null,
  selectedIdForDelete: null,
  taskFilterString: "",
  empIdsForFilter: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setStatusList(state, action) {
      state.statusList = action.payload;
    },
    setEmployeeList(state, action) {
      state.employeeList = action.payload;
    },
    setTasksWithoutFilter(state, action) {
      state.tasksWithoutFilter = action.payload;
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    setTaskById(state, action) {
      state.taskById = action.payload;
    },
    setSelectedIdForView(state, action) {
      state.selectedIdForView = action.payload;
    },
    setSelectedIdForEdit(state, action) {
      state.selectedIdForEdit = action.payload;
    },
    setSelectedIdForDelete(state, action) {
      state.selectedIdForDelete = action.payload;
    },
    setTaskFilterString(state, action) {
      state.taskFilterString = action.payload;
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
    setClearFilter(state, action) {
      state.taskFilterString = "";
      state.empIdsForFilter = [];
    },
    setTaskInitState(state) {
      state.taskById = {};
      state.selectedIdForView = null;
      state.selectedIdForEdit = null;
      state.selectedIdForDelete = null;
    },
  },
});

export const {
  setTasks,
  setStatusList,
  setTaskById,
  setSelectedIdForEdit,
  setSelectedIdForDelete,
  setSelectedIdForView,
  setTaskInitState,
  setTaskFilterString,
  setEmployeeList,
  setEmpIdsForFilter,
  setOnlyCurrentEmpIdForFilter,
  setClearFilter,
  setTasksWithoutFilter,
} = taskSlice.actions;
export default taskSlice.reducer;
