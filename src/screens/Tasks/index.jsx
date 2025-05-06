import { useEffect, useState } from "react";
import { statusData, TaskData } from "../../constants/data";
import TaskTable from "./TaskList/TaskTable";
import "./Tasks.css";
import Popup, { closePopup, openPopup } from "../../components/Popup.jsx";
import AddEditTaskForm from "./AddEditTaskForm/index.jsx";
import DeleteTask from "./DeleteTask/index.jsx";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedIdForEdit, setSelectedIdForEdit] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedIdForDelete, setSelectedIdForDelete] = useState(null);

  const getTasks = () => {
    setTasks(TaskData);
  };

  const getTaskById = (id) => {
    let data = TaskData.find((t) => t.id === id);
    setFormData(data);
  };

  const deleteTaskById = () => {
    setTasks(TaskData.filter((t) => t.id !== selectedIdForDelete));
    closePopup();
  };

  const updateStatus = (taskId, statusId) => {
    let idx = tasks.findIndex((t) => t.id === taskId);
    const temp = [...tasks];
    temp[idx] = {
      ...tasks[idx],
      status: statusId,
    };
    setTasks(temp);
  };

  const onPopupClose = (cb) => {
    closePopup();
    setSelectedIdForEdit(null);
    cb && cb();
  };

  const onAddEdit = (data, resetCb) => {
    console.log("Form Data:", data);
    onPopupClose(resetCb);
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (selectedIdForEdit) {
      getTaskById(selectedIdForEdit);
    } else {
      setFormData({
        status: statusData[0].id,
      });
    }
  }, [selectedIdForEdit]);

  return (
    <>
      <Popup>
        {selectedIdForDelete ? (
          <DeleteTask deleteTaskById={deleteTaskById} />
        ) : (
          <AddEditTaskForm
            data={formData}
            onSubmit={onAddEdit}
            onPopupClose={onPopupClose}
          />
        )}
      </Popup>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={openPopup}>Add New Task</button>
      </div>
      <TaskTable
        tasks={tasks}
        setSelectedIdForEdit={setSelectedIdForEdit}
        setSelectedIdForDelete={setSelectedIdForDelete}
        updateStatus={updateStatus}
      />
    </>
  );
};

export default Tasks;
