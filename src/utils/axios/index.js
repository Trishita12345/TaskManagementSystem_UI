import Axios from "axios";
import { URLS } from "../constants/urls";
import strings from "common/Translation/Translate";

const axiosInstance = Axios.create({
  baseURL: "", //Config.BaseURL,
  headers: { "Content-Type": "application/json" },
});
axiosInstance.defaults.timeout = 300000;

const refreshToken = () => {};
//   const body = new URLSearchParams();
//   const token = fetchFromStorage(identifiers.refresh_token);

//   body.append("refresh_token", token || "");
//   body.append("scope", "webclient");
//   body.append("grant_type", "refresh_token");
//   const config = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     auth: {
//       username: process.env.REACT_APP_CLIENT,
//       password: process.env.REACT_APP_SECRET,
//     },
//   };

//   Axios.post(Config.BaseURL + URLS.login, body, config)
//     .then(({ data, status }) => {
//       if (status === 200) {
//         removeFromStorage(identifiers.token);
//         saveToStorage(identifiers.access_token, data.access_token);
//         saveToStorage(identifiers.privilegeList, data.privileges);
//         saveToStorage(identifiers.refresh_token, data.refresh_token);
//         window.location.reload();
//       }
//     })
//     .catch((error) => {
//       logoutUser();
//     });
// };

// axiosInstance.interceptors.request.use((config) => {
// const token = fetchFromStorage(identifiers.access_token);
// const clonedConfig = config;

// if (token) {
//   clonedConfig.headers.common = {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   };
// }
// clonedConfig.params = {
//   ...config.params,
// };
// if (!!config.data) {
//   clonedConfig.data = {
//     data: CryptoJS.AES.encrypt(
//       JSON.stringify(config.data),
//       "test#123"
//     ).toString(),
//   };
// }
// console.log('clonedConfig: ',lang, clonedConfig)
//   return clonedConfig;
// });

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.config.url !== URLS.login
    ) {
      refreshToken();
    } else if (
      error.response &&
      (error.code === "ERR_NETWORK" ||
        error.response.status === 503 ||
        error.response.status === 502)
    ) {
      window.location.href = "#/errorPage";
    } else if (error.response && error.response.status === 500) {
      throw new Error(strings.somethingWentWrong);
    } else if (error.response && error?.response?.status === 403) {
      throw new Error(strings.forbidden);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
