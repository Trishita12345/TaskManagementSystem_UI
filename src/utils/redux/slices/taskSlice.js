import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusList: [],
  tasks: [],
  taskById: {},
  selectedIdForView: null,
  selectedIdForEdit: null,
  selectedIdForDelete: null,
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
} = taskSlice.actions;
export default taskSlice.reducer;
