import { useEffect, useState } from "react";
import { employeeData, statusData, TaskData } from "../../constants/data";
import TaskTable from "./TaskList/TaskTable";
import "./Tasks.css";
import Popup, { closePopup, openPopup } from "../../components/Popup";
import AddEditTaskForm from "./AddEditTaskForm";
import DeleteTask from "./DeleteTask";
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
import ViewTask from "./ViewTask";
import Loader from "../../components/Loader";
import { setIsLoading } from "../../utils/redux/slices/commonSlice.js";
import { priviledges } from "../../constants/priviledges.js";
import NotAuthorized from "../../components/NotAuthorized";
import AddTaskButton from "./AddTaskButton";
import FilterTask from "./FilterTask";
import useScreenSize from "../../utils/customHooks/useScreenSize.jsx";

const Tasks = () => {
  const [openAddPopUp, setOpenAddPopUp] = useState(false);

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
  const selectedIdForEdit = useSelector(
    (state) => state.taskSlice.selectedIdForEdit
  );

  const selectedIdForDelete = useSelector(
    (state) => state.taskSlice.selectedIdForDelete
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

  const getTaskById = (id) => {
    console.log("editedId:", id);
    let data = TaskData.find((t) => t.id === id);
    dispatch(setTaskById(data));
  };

  const deleteTaskById = () => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setIsLoading(false));
      onPopupClose();
    }, 1500);
  };

  const updateStatus = (taskId, statusId) => {
    console.log("taskId: ", taskId, "statusId: ", statusId);
    let idx = tasks.findIndex((t) => t.id === taskId);
    const temp = [...tasks];
    temp[idx] = {
      ...tasks[idx],
      status: statusId,
    };
    dispatch(setTasks(temp));
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
    if (selectedIdForView || selectedIdForEdit) {
      getTaskById(selectedIdForView || selectedIdForEdit);
    }
  }, [selectedIdForEdit, selectedIdForView]);

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
        {selectedIdForDelete && (
          <DeleteTask
            deleteTaskById={deleteTaskById}
            onPopupClose={onPopupClose}
          />
        )}
        {selectedIdForView && <ViewTask onPopupClose={onPopupClose} />}
        {(openAddPopUp || selectedIdForEdit) && (
          <AddEditTaskForm onSubmit={onAddEdit} onPopupClose={onPopupClose} />
        )}
      </Popup>
      <div
        style={{
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
      </div>
      <TaskTable updateStatus={updateStatus} />
    </>
  );
};

export default Tasks;
