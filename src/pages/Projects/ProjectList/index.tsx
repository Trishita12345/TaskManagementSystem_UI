import { useEffect, useState } from "react";
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
import type {
  addConfigProps,
  ListPageCustomCellProps,
  pageBodyProps,
  pageConfigProps,
  tableColumnProps,
} from "../../../constants/types";
import {
  getDateDiff,
  getErrorMessage,
} from "../../../utils/helperFunctions/commonHelperFunctions";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  setIsLoading,
  setIsSidebarOpen,
  setMessage,
} from "../../../utils/redux/slices/commonSlice";
import FullNameComponent from "../../../components/FullNameComponent";
import { getPaginatedList } from "../../../utils/services/getListService";
import type { AxiosError } from "axios";

const Manager = ({ item }: ListPageCustomCellProps) => (
  <FullNameComponent
    firstName={item.manager.firstName}
    lastName={item.manager.lastName}
    profileImage={item.manager.profileImage}
  />
);

const LastUpdate = ({ item }: ListPageCustomCellProps) => (
  <Typography>
    {`${getDateDiff(item.updatedAt)} by ${item.updatedBy.firstName} ${
      item.updatedBy.lastName
    }`}
  </Typography>
);
const ProjectList = () => {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [pageResponse, setPageResponse] = useState<any>({});
  const { permissions } = useSelector(userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || "0";
  const size = searchParams.get("size") || "10";
  const sortBy = searchParams.get("sortby") || "";
  const direction = searchParams.get("dir") || "desc";
  const query = searchParams.get("query") || "";

  const getList = async () => {
    let body: pageBodyProps = {
      page: page,
      size: size,
      direction: direction,
    } as any;

    if (sortBy !== "") {
      body = { ...body, sortBy: sortBy };
    }
    try {
      dispatch(setIsLoading(true));
      const { data } = await getPaginatedList(
        query,
        pageConfig.listPageUrl,
        body
      );
      setPageResponse(data);
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      dispatch(
        setMessage({
          display: true,
          severity: "error",
          message: getErrorMessage(err),
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  useEffect(() => {
    getList();
  }, [page, size, sortBy, direction, query]);

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

  const tableColumn: tableColumnProps[] = [
    {
      field: "name",
      headerName: "Project Name",
      sortable: true,
      component: ProjectName,
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
      dataType: "date",
      component: LastUpdate,
    },
  ];
  const pageConfig: pageConfigProps = {
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
  const addConfig: addConfigProps = {
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
          <ListPage
            pageConfig={pageConfig}
            addConfig={addConfig}
            pageResponse={pageResponse}
          />
        </>
      ) : (
        <NotAuthorized />
      )}
    </>
  );
};

export default ProjectList;
