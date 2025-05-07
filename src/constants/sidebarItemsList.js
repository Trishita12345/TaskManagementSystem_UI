import { priviledges } from "./priviledges";
import { routes } from "./routes";
import strings from "./strings";
import {
  faGear,
  faTableColumns,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";

export const sidebarItemsList = [
  {
    id: 1,
    name: strings.myBoard,
    icon: faTableColumns,
    route: routes.myBoard,
    priviledge: priviledges.view_my_board,
  },
  {
    id: 2,
    name: strings.taskList,
    icon: faTableList,
    route: routes.taskList,
    priviledge: priviledges.view_my_board,
  },
  {
    id: 3,
    name: strings.manageEmployees,
    icon: faGear,
    route: routes.manageEmployees,
    priviledge: priviledges.view_manage_employees,
  },
];
