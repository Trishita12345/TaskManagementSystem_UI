import { useEffect, useState } from "react";
import ListPage from "../../../components/ListPage";
import { priviledges } from "../../../constants/priviledges";
import { urls } from "../../../constants/urls";
import { routes } from "../../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProject,
  userDetails,
} from "../../../utils/redux/slices/authenticationSlice";
import NotAuthorized from "../../NotAuthorized";
import { Link, Typography } from "@mui/material";
import type {
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
import { getPaginatedList } from "../../../utils/services/commonService";
import type { AxiosError } from "axios";
import AddEditProjectForm from "../AddEditProject/AddEditProjectForm";
import AddModal from "../../../components/AddModal";

const ProjectList = () => {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [pageResponse, setPageResponse] = useState<any>({});
  const { permissions } = useSelector(userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || "0";
  const size = searchParams.get("size") || "5";
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
        urls.getProjectsPage,
        body
      );
      const modifiedData = {
        ...data,
        content: data.content.map((item: any) => ({
          ...item,
          manager: <FullNameComponent employeeDetails={item.manager} />,
          name: (
            <Link
              underline="hover"
              onClick={() => selectProject(item)}
              sx={{ fontWeight: 600, fontSize: "14px" }}
            >
              {item.name}
            </Link>
          ),
          updatedAt: (
            <Typography>
              {`${getDateDiff(item.updatedAt)} by ${item.updatedBy.firstName} ${
                item.updatedBy.lastName
              }`}
            </Typography>
          ),
        })),
      };
      setPageResponse(modifiedData);
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
    },
    {
      field: "manager",
      headerName: "Managed By",
      sortable: true,
    },
    {
      field: "updatedAt",
      headerName: "Last Update",
      sortable: true,
      dataType: "date",
    },
  ];
  const pageConfig: pageConfigProps = {
    title: "Projects",
    addPrivilege: priviledges.add_project,
    addButtonText: "Create Project",
    tableColumn: tableColumn,
    hideActionText: false,
    viewPriviledge: priviledges.view_project,
    detailsRoute: routes.viewEditProject,
    deletePrivilege: "",
    idColumn: "projectId",
  };

  return (
    <>
      {permissions.includes(pageConfig.viewPriviledge) ? (
        <>
          <ListPage
            pageConfig={pageConfig}
            handleAddBtnClick={() => setAddModalOpen(true)}
            pageResponse={pageResponse}
            addComponent={
              <AddModal
                addModalOpen={addModalOpen}
                setAddModalOpen={setAddModalOpen}
                headerText={"Create Project"}
              >
                <AddEditProjectForm
                  onSuccess={() => {
                    setAddModalOpen(false);
                    getList();
                  }}
                />
              </AddModal>
            }
          />
        </>
      ) : (
        <NotAuthorized />
      )}
    </>
  );
};

export default ProjectList;
