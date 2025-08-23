import type { AddTaskFormValues } from "../../constants/types";
import axiosInstance from "../axios";

export const fetchAllStatuses = () => {
  return axiosInstance("/authenticated/tasks/statuses");
};
export const fetchAllPriorities = () => {
  return axiosInstance("/authenticated/tasks/priorities");
};
export const fetchAllTaskTypes = () => {
  return axiosInstance("/authenticated/tasks/types");
};

export const fetchAllTasks = (
  projectId: string,
  query: string,
  selectedEmpIds: string[]
) => {
  const body = {
    employeeIDs: selectedEmpIds,
  };
  return axiosInstance.post(
    `/authenticated/tasks/${projectId}/list?query=${query}`,
    body
  );
};
export const addTask = (projectId: string, formdata: AddTaskFormValues) => {
  return axiosInstance.post(`/authenticated/tasks/${projectId}`, formdata);
};

export const updateTask = (
  projectId: string,
  taskId: string,
  body: {
    key: string;
    value: string;
  }
) => {
  return axiosInstance.patch(
    `/authenticated/tasks/${projectId}/${taskId}`,
    body
  );
};
