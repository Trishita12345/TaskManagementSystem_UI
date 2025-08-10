import { useEffect, useState } from "react";
import { employeeData, statusData, TaskData } from "../../constants/data";

import Popup, { closePopup, openPopup } from "../../components/Popup";
import AddTaskForm from "./AddTask/AddTaskForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setTaskInitState,
  setStatusList,
  setTaskById,
  setTasks,
  setEmployeeList,
  setEmpIdsForFilter,
  setOnlyCurrentEmpIdForFilter,
  setClearFilter,
  setTasksWithoutFilter,
} from "../../utils/redux/slices/taskSlice.js";
import Loader from "../../components/Loader";
import { setIsLoading } from "../../utils/redux/slices/commonSlice.js";
import { priviledges } from "../../constants/priviledges.js";
import NotAuthorized from "../../components/NotAuthorized";
import AddTaskButton from "./AddTask/AddTaskButton/index.jsx";
import FilterTask from "./FilterTask";
import useScreenSize from "../../utils/customHooks/useScreenSize.jsx";
import { Box } from "@mui/material";

const Tasks = () => {
  const { width } = useScreenSize();
  const dispatch = useDispatch();

  const empId = useSelector((state) => state.authenticationSlice.empId);
  const userPriviledges = useSelector(
    (state) => state.authenticationSlice.userPriviledges
  );
  const tasksWithoutFilter = useSelector(
    (state) => state.taskSlice.tasksWithoutFilter
  );
  const tasks = useSelector((state) => state.taskSlice.tasks);
  const isLoading = useSelector((state) => state.commonSlice.isLoading);
  const empIdsForFilter = useSelector(
    (state) => state.taskSlice.empIdsForFilter
  );
  const selectedIdForView = useSelector(
    (state) => state.taskSlice.selectedIdForView
  );

  const onPopupClose = (cb = () => {}) => {
    closePopup();
    dispatch(setTaskInitState());
    setOpenAddPopUp(false);
    if (cb) cb();
  };

  const getStatuses = () => {
    dispatch(setStatusList(statusData));
  };
  const getEmployees = () => {
    dispatch(setEmployeeList(employeeData));
  };

  const getTasks = () => {
    dispatch(setTasks(TaskData));
    dispatch(setTasksWithoutFilter(TaskData));
  };

  const onAddEdit = (data, resetCb) => {
    console.log("Form Data:", data);
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setIsLoading(false));
      onPopupClose(resetCb);
    }, 1500);
  };

  const onAdd = () => {
    openPopup();
    setOpenAddPopUp(true);
  };

  const handleFilterInputChange = (data) => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 500);
  };

  const handleSelectUser = (empId) => {
    dispatch(setEmpIdsForFilter(empId));
  };

  const selectCurrentUserForFilter = () => {
    dispatch(setOnlyCurrentEmpIdForFilter(empId));
  };

  const onClear = () => {
    dispatch(setClearFilter());
  };

  useEffect(() => {
    //TODO: promise.all
    getTasks();
    getStatuses();
    getEmployees();
  }, []);

  useEffect(() => {
    let tempTasks;
    if (empIdsForFilter.length > 0) {
      tempTasks = tasksWithoutFilter.filter((item) =>
        empIdsForFilter.includes(item.assignedTo)
      );
    } else tempTasks = tasksWithoutFilter;
    dispatch(setTasks(tempTasks));
  }, [empIdsForFilter, tasksWithoutFilter]);

  if (!userPriviledges.includes(priviledges.view_task))
    return <NotAuthorized />;
  return (
    <>
      {isLoading && <Loader />}
      <Popup>
        <AddTaskForm onSubmit={onAddEdit} onPopupClose={onPopupClose} />
      </Popup>
      <Box
        sx={{
          display: "flex",
          alignItems: width > 700 ? "center" : "end",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <FilterTask
          handleFilterInputChange={handleFilterInputChange}
          onClear={onClear}
          handleSelectUser={handleSelectUser}
          selectCurrentUserForFilter={selectCurrentUserForFilter}
        />
        <AddTaskButton onAdd={onAdd} />
      </Box>
      BODY
    </>
  );
};

export default Tasks;
