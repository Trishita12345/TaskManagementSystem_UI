import Cookies from "js-cookie";
import { urls } from "../constants/urls";
import axiosInstance from "./axios";

export const logoutUser = () => {
  Cookies.remove("access");
  Cookies.remove("refresh");
};
export const refreshToken = async () => {
  try {
    axiosInstance.post(urls.refreshToken);
  } catch {
    logoutUser();
  } finally {
    window.location.reload();
  }
};
