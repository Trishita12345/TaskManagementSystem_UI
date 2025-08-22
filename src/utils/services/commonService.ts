import type { pageBodyProps } from "../../constants/types";
import { urls } from "../../constants/urls";
import axiosInstance from "../axios";

export const getAllEmployees = (roleId: string) => {
  if (!roleId) return axiosInstance.get(urls.getAllEmployees);
  else return axiosInstance.get(`${urls.getAllEmployees}?roleId=${roleId}`);
};

export const getPaginatedList = (
  query: string,
  url: string,
  body: pageBodyProps
) => {
  return axiosInstance.post(`${url}?query=${query}`, body);
};
