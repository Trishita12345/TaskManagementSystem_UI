export const getStatusColor = (status: number) => {
  if (status === 3) return "#346618";
  else if (status === 2) return "#d4a304";
  else return "#c70404";
};
export const getNameInitials = (firstName: string, lastName: string) => {
  return `${firstName.substring(0, 1)}${lastName.substring(0, 1)}`;
};
export const createPageUrl = (query: string, listPageUrl: string) => {
  return query !== "" ? `${listPageUrl}?query=${query}` : listPageUrl;
};
export const saveToStorage = (
  key: string,
  value: string,
  session?: boolean
) => {
  if (session) {
    sessionStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, value);
  }
};

export const fetchFromStorage = (key: string, session?: boolean) => {
  if (session) {
    return sessionStorage.getItem(key);
  } else {
    return localStorage.getItem(key);
  }
};

export const getErrorMessage = (err: any) =>
  err.response?.data.message || err?.message || err;

export const removeFromStorage = (key: string, session?: boolean) => {
  if (session) {
    sessionStorage.removeItem(key);
  } else {
    localStorage.removeItem(key);
  }
};

export const clearStorage = (level: "session" | "local" | "all" = "local") => {
  switch (level) {
    case "session":
      sessionStorage.clear();
      break;
    case "local":
      localStorage.clear();
      break;
    case "all":
      sessionStorage.clear();
      localStorage.clear();
      break;
  }
};
