import { useEffect } from "react";
import { employeeData, statusData, TaskData } from "../../constants/data.js";

import Popup, { closePopup, openPopup } from "../../components/Popup/index.js";
import AddTaskForm from "./AddTask/AddTaskForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setTaskInitState,
  setStatusList,
  setTasks,
  setEmployeeList,
  setEmpIdsForFilter,
  setOnlyCurrentEmpIdForFilter,
  setClearFilter,
  setTasksWithoutFilter,
} from "../../utils/redux/slices/taskSlice.js";
import Loader from "../../components/Loader/index.js";
import { setIsLoading } from "../../utils/redux/slices/commonSlice.js";
import { priviledges } from "../../constants/priviledges.js";
import NotAuthorized from "../../components/NotAuthorized";
import AddTaskButton from "./AddTask/AddTaskButton";
import FilterTask from "./FilterTask/index.js";
import useScreenSize from "../../utils/customHooks/useScreenSize.js";
import { Box } from "@mui/material";
import { userDetails } from "../../utils/redux/slices/authenticationSlice.js";

const Tasks = () => {
  const { width } = useScreenSize();
  const dispatch = useDispatch();
  const { permissions, empId } = useSelector(userDetails);
  const tasksWithoutFilter = useSelector(
    (state: any) => state.taskSlice.tasksWithoutFilter
  );
  // const tasks = useSelector((state: any) => state.taskSlice.tasks);
  const isLoading = useSelector((state: any) => state.commonSlice.isLoading);
  const empIdsForFilter = useSelector(
    (state: any) => state.taskSlice.empIdsForFilter
  );
  // const selectedIdForView = useSelector(
  //   (state: any) => state.taskSlice.selectedIdForView
  // );

  const onPopupClose = (cb = () => {}) => {
    closePopup();
    dispatch(setTaskInitState());
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

  const onAddEdit = (data: any, resetCb: any) => {
    console.log("Form Data:", data);
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setIsLoading(false));
      onPopupClose(resetCb);
    }, 1500);
  };

  const onAdd = () => {
    openPopup();
  };

  const handleFilterInputChange = (data: any) => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, 500);
  };

  const handleSelectUser = (empId: string) => {
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
      tempTasks = tasksWithoutFilter.filter((item: any) =>
        empIdsForFilter.includes(item.assignedTo)
      );
    } else tempTasks = tasksWithoutFilter;
    dispatch(setTasks(tempTasks));
  }, [empIdsForFilter, tasksWithoutFilter]);

  if (!permissions.includes(priviledges.view_task)) return <NotAuthorized />;
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
