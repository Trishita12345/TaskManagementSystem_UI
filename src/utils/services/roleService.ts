import type { AddEditRoleFormInputs } from "../../constants/types";
import { urls } from "../../constants/urls";
import axiosInstance from "../axios";

export const addRole = (formData: AddEditRoleFormInputs) => {
  return axiosInstance.post(urls.addRole, formData);
};

export const fetchAllPermissions = () => {
  return axiosInstance(urls.getAllPermissions);
};

export const fetchRoleDetails = (id: string) => {
  return axiosInstance(urls.getRoleDetailsById(id));
};

export const updateRoleById = (id: string, body: AddEditRoleFormInputs) => {
  return axiosInstance.put(urls.updateRole(id), body);
};
