import Axios from "axios";
import strings from "../../constants/strings";
import { urls } from "../../constants/urls";
import { refreshToken } from "../helperFunctions/authHelperFunctions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = Axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
axiosInstance.defaults.timeout = 300000;

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.config.url !== urls.login
    ) {
      refreshToken();
    } else if (
      error.response &&
      (error.response.status === 503 || error.response.status === 502)
    ) {
      window.location.href = "#/errorPage";
    } else if (error.response && error?.response?.status === 403) {
      throw new Error(strings.notAuthorizedError);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
