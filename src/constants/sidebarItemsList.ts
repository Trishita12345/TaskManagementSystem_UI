import { priviledges } from "./priviledges";
import { routes } from "./routes";
import strings from "./strings";
import {
  faGear,
  faTableColumns,
  faUser,
  faDiagramProject,
} from "@fortawesome/free-solid-svg-icons";

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
    name: strings.projectSetting,
    icon: faGear,
    route: routes.projectSettings,
    priviledge: priviledges.view_project,
  },
  {
    id: 3,
    name: strings.manageEmployees,
    icon: faUser,
    route: routes.manageEmployees,
    priviledge: priviledges.view_employees,
  },
  {
    id: 4,
    name: strings.role,
    icon: faDiagramProject,
    route: routes.roleList,
    priviledge: priviledges.view_roles,
  },
];
