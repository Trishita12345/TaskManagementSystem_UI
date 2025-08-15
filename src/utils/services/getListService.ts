import type { pageBodyProps } from "../../constants/types";
import axiosInstance from "../axios";
import { createPageUrl } from "../helperFunctions/commonHelperFunctions";

export const getPaginatedList = (
  query: string,
  url: string,
  body: pageBodyProps
) => {
  return axiosInstance.post(createPageUrl(query, url), body);
};
