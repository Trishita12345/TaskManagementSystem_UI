import ListPage from "../../../components/ListPage";
import strings from "../../../constants/strings";
import { urls } from "../../../constants/urls";
import AssignRole from "./AssignRole";

const ManageEmployeesList = () => {
  const tableColumn = [
    {
      field: "firstName",
      headerName: "First Name",
      sortable: true,
      localField: "firstname",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      sortable: true,
      localField: "lastname",
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
