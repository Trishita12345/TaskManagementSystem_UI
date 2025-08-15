import type { dropdownDataProps } from "../../constants/types";

export const getNameInitials = (firstName: string, lastName: string) => {
  return `${firstName.substring(0, 1)}${lastName.substring(0, 1)}`;
};
export const createPageUrl = (query: string, listPageUrl: string) => {
  return query !== "" ? `${listPageUrl}?query=${query}` : listPageUrl;
};
export const getErrorMessage = (err: any) =>
  err.response?.data.message || err?.message || err;

export function groupPermissions(data: dropdownDataProps[]) {
  const groups = {} as any;

  data.forEach((item: dropdownDataProps) => {
    const arr = item.label.split("_"); // VIEW, TASKS
    item = {
      ...item,
      label: arr
        .map((item: string) => item.charAt(0) + item.slice(1).toLowerCase())
        .join(" "),
    };
    const entity = arr[arr.length - 1];
    const groupName = entity.charAt(0) + entity.slice(1).toLowerCase();

    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(item);
  });
  // Convert to desired output format
  return Object.entries(groups).map(([key, value]) => ({
    label: key,
    value: value,
  }));
}
