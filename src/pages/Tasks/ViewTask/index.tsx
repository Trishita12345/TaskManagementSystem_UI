import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { TaskDetails } from "../../../constants/types";
import { useDispatch, useSelector } from "react-redux";
import { selectedProjectDetails } from "../../../utils/redux/slices/authenticationSlice";
import {
  fetchAllPriorities,
  fetchAllStatuses,
  fetchAllTaskTypes,
  fetchTaskDetails,
  updateTask,
} from "../../../utils/services/taskService";
import {
  getDateDiff,
  getErrorMessage,
  unassignedEmployee,
} from "../../../utils/helperFunctions/commonHelperFunctions";
import {
  loading,
  setIsLoading,
  setMessage,
} from "../../../utils/redux/slices/commonSlice";
import Loader from "../../../components/Loader";
import type { AxiosError } from "axios";
import {
  setPriorityList,
  setStatusList,
  setTaskTypeList,
} from "../../../utils/redux/slices/taskSlice";
import { Box, Divider, Grid, Typography } from "@mui/material";
import TaskName from "./components/TaskName";
import TaskDescription from "./components/TaskDescription";
import TaskBreadCrumps from "./components/TaskBreadCrumps";
import TaskDetailsLabelValue from "./components/TaskDetailsLabelValue";
import TaskStatus from "./components/TaskStatus";
import FullNameComponent from "../../../components/FullNameComponent";
import Priority from "./components/Priority";
import Date from "./components/Date";
import TaskType from "./components/TaskType";
import Assignee from "./components/Assignee";
import Comments from "./Commnets";

const ViewTask = () => {
  const { id } = useParams();
  const { projectId } = useSelector(selectedProjectDetails);
  const [isMetaDataLoaded, setIsMetaDataLoaded] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskDetails | null>(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(loading);
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

  const getSelectedTask = async (showLoading?: boolean) => {
    try {
      showLoading && dispatch(setIsLoading(true));
      const { data } = await fetchTaskDetails(projectId, id as string);
      const modifiedData: TaskDetails = {
        ...data,
        assignedTo: data.assignedTo || unassignedEmployee,
      };
      setSelectedTask(modifiedData);
    } catch (e: any) {
      handleCatch(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    if (isMetaDataLoaded) getSelectedTask(true);
  }, [id, isMetaDataLoaded]);

  const updateSelectedTask = async (
    key: string,
    value: any,
    setLoading?: (val: boolean) => void,
    setIsEditMode?: (val: boolean) => void
  ) => {
    if (!selectedTask) return null;
    try {
      setLoading && setLoading(true);
      await updateTask(projectId, selectedTask.taskId, { key, value });
      await getSelectedTask();
    } catch (error) {
      dispatch(
        setMessage({
          display: true,
          severity: "error",
          message: getErrorMessage(error),
        })
      );
    } finally {
      setLoading && setLoading(false);
      setIsEditMode && setIsEditMode(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {selectedTask && (
        <>
          <TaskBreadCrumps
            selectedTask={selectedTask}
            updateTask={updateSelectedTask}
          />
          <Grid container gap={3}>
            <Grid
              item
              xs={12}
              sm={6}
              md={7}
              lg={8}
              sx={{
                maxHeight: "85vh",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555",
                },
              }}
              pr={3}
            >
              <TaskName
                selectedTask={selectedTask}
                updateTask={updateSelectedTask}
              />
              <TaskDescription
                selectedTask={selectedTask}
                updateTask={updateSelectedTask}
              />
              <Comments />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={3}>
              <TaskStatus
                selectedTask={selectedTask}
                updateTask={updateSelectedTask}
              />
              <Box display={"flex"} flexDirection={"column"} gap={2} my={3}>
                <Assignee
                  selectedTask={selectedTask}
                  updateTask={updateSelectedTask}
                />
                <TaskDetailsLabelValue
                  label={"Reporter"}
                  Component={
                    <FullNameComponent
                      employeeDetails={selectedTask.managedBy}
                      avatarHeight={20}
                      avatarWeight={20}
                      svgIconSize="12px"
                    />
                  }
                />
                <TaskType
                  selectedTask={selectedTask}
                  updateTask={updateSelectedTask}
                />
                <Priority
                  selectedTask={selectedTask}
                  updateTask={updateSelectedTask}
                />
                <Date
                  selectedTask={selectedTask}
                  updateTask={updateSelectedTask}
                  dateType={"startDate"}
                />

                <Date
                  selectedTask={selectedTask}
                  updateTask={updateSelectedTask}
                  dateType={"endDate"}
                />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography
                fontSize={"0.8rem"}
                color={"gray"}
              >{`Created  ${getDateDiff(selectedTask.createdAt)}`}</Typography>
              <Typography
                fontSize={"0.8rem"}
                color={"gray"}
                mt={0.6}
              >{`Updated  ${getDateDiff(selectedTask.updatedAt)}`}</Typography>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ViewTask;
