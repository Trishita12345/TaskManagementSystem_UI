import { useState } from "react";
import ListPage from "../../../components/ListPage";
import { priviledges } from "../../../constants/priviledges";
import { urls } from "../../../constants/urls";
import { routes } from "../../../constants/routes";
import AddProject from "../AddEditProject/AddProject";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProject,
  userDetails,
} from "../../../utils/redux/slices/authenticationSlice";
import NotAuthorized from "../../NotAuthorized";
import { Link, Typography } from "@mui/material";
import type { ListPageCustomCellProps } from "../../../constants/types";
import { getDateDiff } from "../../../utils/helperFunctions/commonHelperFunctions";
import { useNavigate } from "react-router-dom";
import { setIsSidebarOpen } from "../../../utils/redux/slices/commonSlice";
import FullNameComponent from "../../../components/FullNameComponent";

const Manager = ({ item }: ListPageCustomCellProps) => (
  <FullNameComponent
    firstName={item.manager.firstName}
    lastName={item.manager.lastName}
    profileImage={item.manager.profileImage}
  />
);

const LastUpdate = ({ item }: ListPageCustomCellProps) => (
  <Typography>
    {`${
      item.createdAt === item.updatedAt ? "Created " : "updated"
    } ${getDateDiff(item.updatedAt)} by ${item.updatedBy.firstName} ${
      item.updatedBy.lastName
    }`}
  </Typography>
);
const ProjectList = () => {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const { permissions } = useSelector(userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ProjectName = ({ item }: ListPageCustomCellProps) => (
    <Link
      underline="hover"
      onClick={() => selectProject(item)}
      sx={{ fontWeight: 600, fontSize: "14px" }}
    >
      {item.name}
    </Link>
  );
  const selectProject = (item: any) => {
    dispatch(setSelectedProject(item));
    dispatch(setIsSidebarOpen(true));
    navigate(routes.myBoard);
  };

  const tableColumn = [
    {
      field: "name",
      headerName: "Project Name",
      sortable: true,
      component: ProjectName,
    },
    {
      field: "details",
      headerName: "Details",
    },
    {
      field: "manager",
      headerName: "Managed By",
      sortable: true,
      component: Manager,
    },
    {
      field: "updatedAt",
      headerName: "Last Update",
      sortable: true,
      component: LastUpdate,
    },
  ];
  const pageConfig = {
    title: "Projects",
    listPageUrl: urls.getProjectsPage,
    addPrivilege: priviledges.add_project,
    addButtonText: "Create Project",
    tableColumn: tableColumn,
    hideActionText: false,
    viewPriviledge: priviledges.view_project,
    detailsRoute: routes.viewEditProject,
    deletePrivilege: "",
    idColumn: "projectId",
  };
  const addConfig = {
    addModalOpen: addModalOpen,
    setAddModalOpen: setAddModalOpen,
    headerText: "Create Project",
    AddComponent: AddProject,
    handleAddBtnClick: () => setAddModalOpen(true),
  };

  return (
    <>
      {permissions.includes(pageConfig.viewPriviledge) ? (
        <>
          <ListPage pageConfig={pageConfig} addConfig={addConfig} />
        </>
      ) : (
        <NotAuthorized />
      )}
    </>
  );
};

export default ProjectList;
