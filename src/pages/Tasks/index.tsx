import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedEmployeeIds,
  setPriorityList,
  setStatusList,
  setTasks,
  setTaskTypeList,
  tasks,
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
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
import type { TaskSummary } from "../../constants/types.ts";
import FullNameComponent from "../../components/FullNameComponent/index.tsx";
import { Link as RouterLink } from "react-router-dom";
import KanbanBoard from "./KanbanBoard.tsx";

const Tasks = () => {
  const theme = useSelector(getTheme);
  const { name, projectId } = useSelector(selectedProjectDetails);
  const selectedEmpIds = useSelector(selectedEmployeeIds);
  const taskList = useSelector(tasks);
  const navigate = useNavigate();
  const { width } = useScreenSize();
  const dispatch = useDispatch();
  const isLoading = useSelector(loading);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [isMetaDataLoaded, setIsMetaDataLoaded] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  console.log(selectedEmpIds);
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

  const getTasks = async () => {
    const { data } = await fetchAllTasks(projectId, query, selectedEmpIds);
    dispatch(setTasks(data));
  };
  useEffect(() => {
    if (isMetaDataLoaded) getTasks();
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
      {/* <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Assigned To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList.map((task: TaskSummary) => (
              <TableRow key={task.taskId}>
                <TableCell>
                  <RouterLink to={task.taskId}>{task.taskName}</RouterLink>
                </TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.type}</TableCell>
                <TableCell>
                  <FullNameComponent employeeDetails={task.assignedTo} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <AddModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        headerText={"Create Issue"}
      >
        <AddTaskForm setAddModalOpen={setAddModalOpen} />
      </AddModal>
    </>
  );
};

export default Tasks;
