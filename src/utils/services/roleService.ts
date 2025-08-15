import type { AddEditRoleFormInputs } from "../../constants/types";
import { urls } from "../../constants/urls";
import axiosInstance from "../axios";

export const addRole = (formData: AddEditRoleFormInputs) => {
  return axiosInstance.post(urls.addRole, formData);
};
