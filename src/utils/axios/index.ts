import Axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import strings from "../../constants/strings";
import { urls } from "../../constants/urls";
import { fetchFromStorage } from "../helperFunctions/storageHelperFunctions";
import { refreshToken } from "../helperFunctions/authHelperFunctions";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = Axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
axiosInstance.defaults.timeout = 300000;

// --- Request interceptor ---
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = fetchFromStorage("access");
  if (token) {
    if (!config.headers) config.headers = new AxiosHeaders();
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// --- Response interceptor ---
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== urls.login &&
      originalRequest.url !== urls.refreshToken
    ) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = "Bearer " + newToken;
        }
        return axiosInstance(originalRequest); // retry once
      } catch (err) {
        return Promise.reject(err);
      }
    }

    if (error.response?.status === 503 || error.response?.status === 502) {
      window.location.href = "#/errorPage";
    } else if (error.response?.status === 403) {
      throw new Error(strings.notAuthorizedError);
    } else if (error.response?.status === 404) {
      window.location.href = "/not-found";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
