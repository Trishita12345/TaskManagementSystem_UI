import FullNameComponent from "../../components/FullNameComponent";
import ListPage from "../../components/ListPage";
import strings from "../../constants/strings";
import type { ListPageCustomCellProps } from "../../constants/types";
import { urls } from "../../constants/urls";
import AssignRole from "./AssignRole";

const ManageEmployeesList = () => {
  const Name = ({ item }: ListPageCustomCellProps) => (
    <FullNameComponent
      firstName={item.firstName}
      lastName={item.lastName}
      profileImage={item.profileImage}
    />
  );
  const tableColumn = [
    {
      field: "firstName",
      headerName: "Name",
      sortable: true,
      localField: "firstname",
      component: Name,
    },
    {
      field: "email",
      headerName: "Email Id",
      sortable: true,
    },
    {
      field: "role",
      headerName: "Role",
      component: AssignRole,
      sortable: true,
      localField: "role.name",
    },
  ];
  const pageConfig = {
    title: strings.manageEmployees,
    listPageUrl: urls.getEmployessPage,
    addPrivilege: "",
    addButtonText: "",
    tableColumn: tableColumn,
    hideActionText: true,
    viewPriviledge: "",
    detailsRoute: "",
    deletePrivilege: "",
    idColumn: "employeeId",
  };

  return <ListPage pageConfig={pageConfig} />;
};

export default ManageEmployeesList;
