import { useState } from "react";
import ListPage from "../../../components/ListPage";
import { priviledges } from "../../../constants/priviledges";
import { urls } from "../../../constants/urls";
import { routes } from "../../../constants/routes";
import AddProject from "../AddEditProject/AddProject";
import { useSelector } from "react-redux";
import { userDetails } from "../../../utils/redux/slices/authenticationSlice";
import NotAuthorized from "../../NotAuthorized";
import { Typography } from "@mui/material";
import type { ListPageCustomCellProps } from "../../../constants/types";

const ProjectList = () => {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const { permissions } = useSelector(userDetails);
  const A = ({ item }: ListPageCustomCellProps) => (
    <Typography>
      {item.manager.firstName + " " + item.manager.lastName}
    </Typography>
  );
  const tableColumn = [
    {
      field: "name",
      headerName: "Project Name",
      sortable: true,
    },
    {
      field: "details",
      headerName: "Details",
    },
    {
      field: "manager",
      headerName: "Manager",
      sortable: true,
      component: A,
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
        <ListPage pageConfig={pageConfig} addConfig={addConfig} />
      ) : (
        <NotAuthorized />
      )}
    </>
  );
};

export default ProjectList;
