export const getStatusColor = (status) => {
  if (status === 3) return "#346618";
  else if (status === 2) return "#d4a304";
  else return "#c70404";
};
export const getNameInitials = (firstName, lastName) => {
  return `${firstName.substring(0, 1)}${lastName.substring(0, 1)}`;
};
