import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedEmployeeIds,
  setPriorityList,
  setStatusList,
  setTasks,
  setTaskTypeList,
} from "../../utils/redux/slices/taskSlice.ts";
import Loader from "../../components/Loader/index.js";
import {
  getTheme,
  loading,
  setIsLoading,
  setMessage,
} from "../../utils/redux/slices/commonSlice.js";
import FilterTask from "./FilterTask/index.js";
import useScreenSize from "../../utils/customHooks/useScreenSize.js";
import { Box, Link } from "@mui/material";
import AddTaskButton from "./AddTask/AddTaskButton/index.js";
import ProjectBreadcrumbs from "../../components/ProjectBreadcrumbs/index.tsx";
import { routes } from "../../constants/routes.ts";
import { selectedProjectDetails } from "../../utils/redux/slices/authenticationSlice.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  fetchAllPriorities,
  fetchAllStatuses,
  fetchAllTasks,
  fetchAllTaskTypes,
} from "../../utils/services/taskService.ts";
import { getErrorMessage } from "../../utils/helperFunctions/commonHelperFunctions.ts";
import type { AxiosError } from "axios";
import AddModal from "../../components/AddModal/index.tsx";
import AddTaskForm from "./AddTask/AddTaskForm.tsx";
import KanbanBoard from "./KanbanBoard.tsx";

const Tasks = () => {
  const theme = useSelector(getTheme);
  const { name, projectId } = useSelector(selectedProjectDetails);
  const selectedEmpIds = useSelector(selectedEmployeeIds);
  const navigate = useNavigate();
  const { width } = useScreenSize();
  const dispatch = useDispatch();
  const isLoading = useSelector(loading);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [isMetaDataLoaded, setIsMetaDataLoaded] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const handleCatch = (err: AxiosError<{ message: string }>) => {
    dispatch(
      setMessage({
        display: true,
        severity: "error",
        message: getErrorMessage(err),
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setIsLoading(true));
        const [taskTypes, priorityTypes, statuses] = await Promise.all([
          fetchAllTaskTypes(),
          fetchAllPriorities(),
          fetchAllStatuses(),
        ]);
        dispatch(setStatusList(statuses.data));
        dispatch(setPriorityList(priorityTypes.data));
        dispatch(setTaskTypeList(taskTypes.data));
        setIsMetaDataLoaded(true);
      } catch (e: any) {
        handleCatch(e);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchData();
  }, []);

  const getTasks = async (withLoading?: boolean) => {
    try {
      withLoading && dispatch(setIsLoading(true));
      const { data } = await fetchAllTasks(projectId, query, selectedEmpIds);
      dispatch(setTasks(data));
    } catch (e: any) {
      handleCatch(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  useEffect(() => {
    if (isMetaDataLoaded) getTasks(true);
  }, [query, selectedEmpIds, isMetaDataLoaded]);

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
        <AddTaskButton onAdd={() => setAddModalOpen(true)} />
      </Box>
      <KanbanBoard />
      <AddModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        headerText={"Create Issue"}
      >
        <AddTaskForm setAddModalOpen={setAddModalOpen} onSuccess={getTasks} />
      </AddModal>
    </>
  );
};

export default Tasks;
