export const urls = {
  login: "/generate-token",
  myProfile: "/auth/my-profile",
  refreshToken: "/refresh-token",
  register: "/auth/user-register",
  rolesPage: "/authenticated/admin/get-roles/page",
  addRole: "/authenticated/admin/add-role",
  getAllPermissions: "/authenticated/admin/get-permissions",
  getRoleDetailsById: (id: string) => `/authenticated/admin/get-role/${id}`,
  updateRole: (id: string) => `/authenticated/admin/update-role/${id}`,
  getEmployessPage: "/authenticated/admin/get-employees/page",
};
