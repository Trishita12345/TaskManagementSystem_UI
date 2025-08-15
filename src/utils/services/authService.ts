import type { LoginFormInputs, RegisterFormProps } from "../../constants/types";
import { urls } from "../../constants/urls";
import axiosInstance from "../axios";

export const login = (formData: LoginFormInputs) => {
  return axiosInstance.post(urls.login, formData);
};

export const getProfile = () => {
  return axiosInstance(urls.myProfile);
};

export const registerUser = (formData: RegisterFormProps) => {
  return axiosInstance.post(urls.register, formData);
};
