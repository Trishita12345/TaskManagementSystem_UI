import Cookies from "js-cookie";
import { urls } from "../../constants/urls";
import axiosInstance from "../axios";
import { removeFromStorage, saveToStorage } from "./storageHelperFunctions";

export const logoutUser = () => {
  removeFromStorage("access");
  Cookies.remove("refresh");
};
export const refreshToken = async () => {
  try {
    const res = await axiosInstance.post(urls.refreshToken);
    saveToStorage("access", res.data.access);
    return res.data.access;
  } catch (err) {
    logoutUser();
    throw err;
  }
};
