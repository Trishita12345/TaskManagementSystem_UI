export interface tableColumnProps {
  field: string;
  headerName: string;
  textAlign?: "left" | "right";
  localField?: string;
  sortable?: boolean;
}
export interface pageConfigProps {
  title: string;
  listPageUrl: string;
  addPrivilege: string;
  addButtonText: string;
  tableColumn: tableColumnProps[];
  hideActionText?: boolean;
  viewPriviledge: string;
  detailsRoute: string;
  deletePrivilege: string;
  idColumn: string;
}
export interface ListPageProps {
  pageConfig: pageConfigProps;
  addConfig?: addConfigProps;
}
export interface addConfigProps {
  addModalOpen: boolean;
  setAddModalOpen: (val: boolean) => void;
  AddComponent: any;
  headerText: string;
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
  usePermissions: string[];
  sortBy: sortByProps;
  handleSort: (field: string) => void;
  page: number;
  handleChangePage: (_event: unknown, newPage: number) => void;
  size: number;
  pageSizeChange: (event: any) => void;
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
