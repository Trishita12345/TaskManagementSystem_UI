import ListPage from "../../../components/ListPage";
import { priviledges } from "../../../constants/priviledges";
import { routes } from "../../../constants/routes";
import strings from "../../../constants/strings";
import { urls } from "../../../constants/urls";

const RoleList = () => {
  const pageConfig = {
    title: strings.role,
    listPageUrl: urls.rolesPage,
    addPrivilege: priviledges.add_roles,
    addButtonRoute: routes.addrole,
    addButtonText: strings.createRole,
    tableColumn: [],
    hideActionText: false,
    viewPriviledge: priviledges.view_roles,
    detailsRoute: routes.role,
    deletePrivilege: priviledges.delete_roles,
  };
  return <ListPage pageConfig={pageConfig} />;
};

export default RoleList;
