import { useEffect } from "react";
import { statusData, TaskData } from "../../constants/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setStatusList, setTasks } from "../../utils/redux/slices/taskSlice.ts";
import Loader from "../../components/Loader/index.js";
import { getTheme, loading } from "../../utils/redux/slices/commonSlice.js";
import FilterTask from "./FilterTask/index.js";
import useScreenSize from "../../utils/customHooks/useScreenSize.js";
import { Box, Link } from "@mui/material";
import AddTaskButton from "./AddTask/AddTaskButton/index.js";
import ProjectBreadcrumbs from "../../components/ProjectBreadcrumbs/index.tsx";
import { routes } from "../../constants/routes.ts";
import { selectedProjectDetails } from "../../utils/redux/slices/authenticationSlice.ts";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const theme = useSelector(getTheme);
  const { name, projectId } = useSelector(selectedProjectDetails);
  const navigate = useNavigate();
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

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      onClick={() => navigate(routes.projectList)}
    >
      Projects
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      onClick={() => navigate(`${routes.viewEditProject}/${projectId}`)}
    >
      {name}
    </Link>,
    <Link
      underline="none"
      key="3"
      color={theme.secondaryContrast}
      sx={{ cursor: "default", fontWeight: 500 }}
    >
      Kanban Board
    </Link>,
  ];

  return (
    <>
      {isLoading && <Loader />}
      <ProjectBreadcrumbs breadcrumbs={breadcrumbs} />
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
