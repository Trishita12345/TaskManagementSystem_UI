import type { AddEditProjectInputProps } from "../../constants/types";
import { urls } from "../../constants/urls";
import axiosInstance from "../axios";

export const fetchSelectedProject = () => {
  const body = {
    page: 0,
    size: 1,
  };
  return axiosInstance.post(urls.getProjectsPage, body);
};

export const addProject = (formData: AddEditProjectInputProps) => {
  return axiosInstance.post(urls.addProject, formData);
};

export const fetchProjectDetails = (id: string) => {
  return axiosInstance(urls.projectById(id));
};

export const updateProject = (id: string, body: AddEditProjectInputProps) => {
  return axiosInstance.patch(urls.projectById(id), body);
};
