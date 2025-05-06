import { useEffect } from "react";
import { statusData, TaskData } from "../../constants/data";
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
} from "../../utils/redux/slices/taskSlice.js";
import ViewTask from "./ViewTask/index.jsx";
import Loader from "../../components/Loader/index.js";
import { setIsLoading } from "../../utils/redux/slices/commonSlice.js";

const Tasks = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.taskStore.tasks);
  const isLoading = useSelector((state) => state.commonStore.isLoading);

  const selectedIdForView = useSelector(
    (state) => state.taskStore.selectedIdForView
  );
  const selectedIdForEdit = useSelector(
    (state) => state.taskStore.selectedIdForEdit
  );

  const selectedIdForDelete = useSelector(
    (state) => state.taskStore.selectedIdForDelete
  );

  const onPopupClose = (cb = () => {}) => {
    closePopup();
    dispatch(setTaskInitState());
    if (cb) cb();
  };

  const getStatuses = () => {
    dispatch(setStatusList(statusData));
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
    console.log("deletedId:", selectedIdForDelete);
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

  useEffect(() => {
    getTasks();
    getStatuses();
  }, []);

  useEffect(() => {
    if (selectedIdForView || selectedIdForEdit) {
      getTaskById(selectedIdForView || selectedIdForEdit);
    }
  }, [selectedIdForEdit, selectedIdForView]);

  return (
    <>
      {isLoading && <Loader />}
      <Popup>
        {selectedIdForDelete ? (
          <DeleteTask
            deleteTaskById={deleteTaskById}
            onPopupClose={onPopupClose}
          />
        ) : selectedIdForView ? (
          <ViewTask onPopupClose={onPopupClose} />
        ) : (
          <AddEditTaskForm onSubmit={onAddEdit} onPopupClose={onPopupClose} />
        )}
      </Popup>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={openPopup}>Add New Task</button>
      </div>
      <TaskTable updateStatus={updateStatus} />
    </>
  );
};

export default Tasks;
