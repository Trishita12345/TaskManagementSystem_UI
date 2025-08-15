import { useState } from "react";
import ListPage from "../../../components/ListPage";
import { priviledges } from "../../../constants/priviledges";
import { routes } from "../../../constants/routes";
import strings from "../../../constants/strings";
import { urls } from "../../../constants/urls";
import AddRole from "../AddRole";

const RoleList = () => {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const tableColumn = [
    {
      field: "name",
      headerName: "Role Name",
      sortable: true,
    },
  ];
  const pageConfig = {
    title: strings.role,
    listPageUrl: urls.rolesPage,
    addPrivilege: priviledges.add_roles,
    addButtonText: strings.createRole,
    tableColumn: tableColumn,
    hideActionText: false,
    viewPriviledge: priviledges.view_roles,
    detailsRoute: routes.role,
    deletePrivilege: "",
    idColumn: "roleId",
  };
  const addConfig = {
    addModalOpen: addModalOpen,
    setAddModalOpen: setAddModalOpen,
    headerText: "Create Role",
    AddComponent: AddRole,
  };

  return <ListPage pageConfig={pageConfig} addConfig={addConfig} />;
};

export default RoleList;
