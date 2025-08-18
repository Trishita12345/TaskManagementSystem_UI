import { useEffect } from "react";
import { statusData, TaskData } from "../../constants/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setStatusList, setTasks } from "../../utils/redux/slices/taskSlice.ts";
import Loader from "../../components/Loader/index.js";
import { loading } from "../../utils/redux/slices/commonSlice.js";
import FilterTask from "./FilterTask/index.js";
import useScreenSize from "../../utils/customHooks/useScreenSize.js";
import { Box } from "@mui/material";
import AddTaskButton from "./AddTask/AddTaskButton/index.js";

const Tasks = () => {
  const { width } = useScreenSize();
  const dispatch = useDispatch();
  const isLoading = useSelector(loading);

  const getStatuses = () => {
    dispatch(setStatusList(statusData));
  };

  const getTasks = () => {
    dispatch(setTasks(TaskData));
  };

  const onAdd = () => {};

  useEffect(() => {
    //TODO: promise.all
    getTasks();
    getStatuses();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <Box
        sx={{
          display: "flex",
          alignItems: width > 700 ? "center" : "end",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <FilterTask />
        <AddTaskButton onAdd={onAdd} />
      </Box>
    </>
  );
};

export default Tasks;
