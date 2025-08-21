import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FullNameComponent from "../../components/FullNameComponent";
import ListPage from "../../components/ListPage";
import strings from "../../constants/strings";
import type { dropdownDataProps, pageBodyProps } from "../../constants/types";
import { urls } from "../../constants/urls";
import { getErrorMessage } from "../../utils/helperFunctions/commonHelperFunctions";
import { setIsLoading, setMessage } from "../../utils/redux/slices/commonSlice";
import { getPaginatedList } from "../../utils/services/getListService";
import AssignRole from "./AssignRole";
import { useDispatch } from "react-redux";
import { fetchRoleOptions } from "../../utils/services/roleService";

const ManageEmployeesList = () => {
  const dispatch = useDispatch();
  const [roleOptions, setRoleOptions] = useState<dropdownDataProps[]>([]);
  const [pageResponse, setPageResponse] = useState<any>({});
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "0";
  const size = searchParams.get("size") || "5";
  const sortBy = searchParams.get("sortby") || "";
  const direction = searchParams.get("dir") || "desc";
  const query = searchParams.get("query") || "";

  const handleCatch = (err: AxiosError<{ message: string }>) => {
    dispatch(
      setMessage({
        display: true,
        severity: "error",
        message: getErrorMessage(err),
      })
    );
  };

  const getRoleOptions = async () => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await fetchRoleOptions();
      setRoleOptions(data);
    } catch (e: any) {
      handleCatch(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  useEffect(() => {
    getRoleOptions();
  }, []);

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
      const modifiedData = {
        ...data,
        content: data.content.map((item: any) => ({
          ...item,
          name: <FullNameComponent employeeDetails={item} />,
          role: (
            <AssignRole
              item={item}
              roleOptions={roleOptions}
              getList={getList}
            />
          ),
        })),
      };
      setPageResponse(modifiedData);
    } catch (e: any) {
      handleCatch(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  useEffect(() => {
    if (roleOptions.length > 0) getList();
  }, [roleOptions, page, size, sortBy, direction, query]);

  const tableColumn = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      localField: "firstname",
    },
    {
      field: "email",
      headerName: "Email Id",
      sortable: true,
    },
    {
      field: "role",
      headerName: "Role",
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
