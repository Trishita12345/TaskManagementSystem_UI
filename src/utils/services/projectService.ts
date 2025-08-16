import { urls } from "../../constants/urls";
import axiosInstance from "../axios";

export const fetchSelectedProject = () => {
  const body = {
    page: 0,
    size: 1,
  };
  return axiosInstance.post(urls.getProjectsPage, body);
};
