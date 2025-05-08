import { useEffect, useState } from "react";
import { employeeData, statusData, TaskData } from "../../constants/data";
import TaskTable from "./TaskList/TaskTable";
import "./Tasks.css";
import Popup, { closePopup, openPopup } from "../../components/Popup";
import AddEditTaskForm from "./AddEditTaskForm/index.jsx";
import DeleteTask from "./DeleteTask/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setTaskInitState,
  setStatusList,
  setTaskById,
  setTasks,
  setEmployeeList,
  setEmpIdsForFilter,
} from "../../utils/redux/slices/taskSlice.js";
import ViewTask from "./ViewTask/index.jsx";
import Loader from "../../components/Loader/index.js";
import { setIsLoading } from "../../utils/redux/slices/commonSlice.js";
import { priviledges } from "../../constants/priviledges.js";
import NotAuthorized from "../../components/NotAuthorized/index.jsx";
import AddTaskButton from "./AddTaskButton/index.jsx";
import FilterTask from "./FilterTask";

const Tasks = () => {
  const [openAddPopUp, setOpenAddPopUp] = useState(false);

  const dispatch = useDispatch();

  const userPriviledges = useSelector(
    (state) => state.authenticationSlice.userPriviledges
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

  const onClear = () => {
    dispatch(setTaskFilterString(""));
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
    // const tempTasks = [...tasks];
    // tempTasks.
    console.log(empIdsForFilter);
  }, [empIdsForFilter]);

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
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <FilterTask
          handleFilterInputChange={handleFilterInputChange}
          onClear={onClear}
          handleSelectUser={handleSelectUser}
        />
        <AddTaskButton onAdd={onAdd} />
      </div>
      <TaskTable updateStatus={updateStatus} />
    </>
  );
};

export default Tasks;
