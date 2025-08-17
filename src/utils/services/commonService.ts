import { urls } from "../../constants/urls";
import axiosInstance from "../axios";

export const getAllEmployees = (roleId: string) => {
  if (!roleId) return axiosInstance.get(urls.getAllEmployees);
  else return axiosInstance.get(`${urls.getAllEmployees}?roleId=${roleId}`);
};
