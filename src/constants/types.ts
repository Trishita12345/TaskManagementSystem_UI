export interface tableColumnProps {
  field: string;
  headerName: string;
  textAlign?: "left" | "right";
  localField?: string;
  sortable?: boolean;
  dataType?: "string" | "number" | "date";
}
export interface pageConfigProps {
  title: string;
  addPrivilege: string;
  addButtonText: string;
  tableColumn: tableColumnProps[];
  hideActionText?: boolean;
  viewPriviledge: string;
  detailsRoute: string;
  deletePrivilege: string;
  idColumn: string;
  noDataHelperText?: string;
}
export interface ListPageProps {
  pageConfig: pageConfigProps;
  pageResponse: any;
  handleAddBtnClick?: any;
  addComponent?: any;
}
export interface addConfigProps {
  addModalOpen: boolean;
  setAddModalOpen: (val: boolean) => void;
  AddComponent: any;
  headerText: string;
  handleAddBtnClick: () => void;
}
export interface pageBodyProps {
  page: number;
  size: number;
  sortBy: string;
  direction: string;
}
export interface sortByProps {
  sortBy: string;
  direction: boolean;
}
export interface ListTableBodyProps {
  pageResponse: any;
  pageConfig: pageConfigProps;
}
export interface RegisterFormProps {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  profileImage: string;
  agree: boolean;
}
export interface LoginFormInputs {
  email: string;
  password: string;
}
export interface AddRoleFormInputs {
  name: string;
}
export interface AddEditRoleFormInputs extends AddRoleFormInputs {
  permissions: string[];
}
export interface dropdownDataProps {
  label: string;
  value: string;
}
export interface PermissionsComponentProps {
  permissionsList: dropdownDataProps[];
  selectedPermissions: string[];
  setSelectedPermissions: (permissionId: string[]) => void;
  isDisabled: boolean;
}

export type EmployeeSummaryType = {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  role: {
    roleId: string;
    roleName: string;
  };
};

export type ProjectDetailsType = {
  projectId: string;
  name: string;
  details: string;

  createdAt: string;
  updatedAt: string;

  manager: EmployeeSummaryType;
  createdBy: EmployeeSummaryType;
  updatedBy: EmployeeSummaryType;

  employees: EmployeeSummaryType[];
};

export type AddEditProjectInputProps = {
  name: string;
  details: string;
  managerId: string;
  employeeIds: (string | undefined)[];
};
export interface ListPageCustomCellProps {
  row: tableColumnProps;
  item: any;
  getList: () => void;
}
export interface themeType {
  primary: string;
  primaryTextColor: string;
  secondaryColor1: string;
  secondaryColor2: string;
  secondaryColor3: string;
  inputBgColor: string;
  secondaryContrast: string;
  opacity: string;
}

export interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
  role: {
    roleId: string;
    name: string;
  };
}

export interface ProjectDetails {
  projectId: string;
  name: string;
  details: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  manager: Employee;
  createdBy: Employee;
  updatedBy: Employee;
  employees: Employee[];
}
