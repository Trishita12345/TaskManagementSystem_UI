import { format } from "date-fns";
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
    employeeIDs: selectedEmpIds.map((s: string) =>
      s === "unassigned" ? null : s
    ),
  };
  return axiosInstance.post(
    `/authenticated/tasks/${projectId}/list?query=${query}`,
    body
  );
};
export const addTask = (projectId: string, formdata: AddTaskFormValues) => {
  const body = {
    ...formdata,
    startDate: formdata.startDate
      ? format(formdata.startDate as Date, "yyyy-MM-dd")
      : null,
    endDate: formdata.startDate
      ? format(formdata.endDate as Date, "yyyy-MM-dd")
      : null,
    assignedTo:
      formdata.assignedTo === "unassigned" ? null : formdata.assignedTo,
  };
  console.log(body);
  return axiosInstance.post(`/authenticated/tasks/${projectId}`, body);
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

export const fetchTaskDetails = (projectId: string, taskId: string) => {
  return axiosInstance(`/authenticated/tasks/${projectId}/${taskId}`);
};

export const deleteTaskById = (projectId: string, taskId: string) => {
  return axiosInstance.delete(`/authenticated/tasks/${projectId}/${taskId}`);
};
