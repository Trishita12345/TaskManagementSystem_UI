import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FullNameComponent from "../../components/FullNameComponent";
import ListPage from "../../components/ListPage";
import strings from "../../constants/strings";
import type {
  ListPageCustomCellProps,
  pageBodyProps,
} from "../../constants/types";
import { urls } from "../../constants/urls";
import { getErrorMessage } from "../../utils/helperFunctions/commonHelperFunctions";
import { setIsLoading, setMessage } from "../../utils/redux/slices/commonSlice";
import { getPaginatedList } from "../../utils/services/getListService";
import AssignRole from "./AssignRole";
import { useDispatch } from "react-redux";

const ManageEmployeesList = () => {
  const dispatch = useDispatch();
  const [pageResponse, setPageResponse] = useState<any>({});
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
        urls.getEmployessPage,
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

  const Name = ({ item }: ListPageCustomCellProps) => (
    <FullNameComponent
      firstName={item.firstName}
      lastName={item.lastName}
      profileImage={item.profileImage}
    />
  );
  const tableColumn = [
    {
      field: "firstName",
      headerName: "Name",
      sortable: true,
      localField: "firstname",
      component: Name,
    },
    {
      field: "email",
      headerName: "Email Id",
      sortable: true,
    },
    {
      field: "role",
      headerName: "Role",
      component: AssignRole,
      sortable: true,
      localField: "role.name",
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

  return <ListPage pageConfig={pageConfig} pageResponse={pageResponse} />;
};

export default ManageEmployeesList;
