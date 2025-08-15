import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ListPage from "../../../components/ListPage";
import strings from "../../../constants/strings";
import type { tableColumnProps } from "../../../constants/types";
import { urls } from "../../../constants/urls";
import { useSelector } from "react-redux";
import { userDetails } from "../../../utils/redux/slices/authenticationSlice";
import { priviledges } from "../../../constants/priviledges";

const ManageEmployeesList = () => {
  const { permissions } = useSelector(userDetails);
  const A = ({ row, item }: { row: tableColumnProps; item: any }) => (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={10}
        label="Age"
        onChange={() => {}}
        disabled={!permissions.includes(priviledges.assign_role)}
        size="small"
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
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
      component: A,
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
