import { priviledges } from "./priviledges";
import { routes } from "./routes";
import strings from "./strings";
import { faGear, faTableColumns } from "@fortawesome/free-solid-svg-icons";

export const sidebarItemsList = [
  {
    id: 1,
    name: strings.myBoard,
    icon: faTableColumns,
    route: routes.myBoard,
    priviledge: priviledges.view_task,
  },
  {
    id: 2,
    name: strings.manageEmployees,
    icon: faGear,
    route: routes.manageEmployees,
    priviledge: priviledges.view_manage_employees,
  },
];
