import { useEffect, useState } from "react";
import ListPage from "../../../components/ListPage";
import { priviledges } from "../../../constants/priviledges";
import { routes } from "../../../constants/routes";
import strings from "../../../constants/strings";
import { urls } from "../../../constants/urls";
import type { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { pageBodyProps, pageConfigProps } from "../../../constants/types";
import { getErrorMessage } from "../../../utils/helperFunctions/commonHelperFunctions";
import {
  setIsLoading,
  setMessage,
} from "../../../utils/redux/slices/commonSlice";
import { getPaginatedList } from "../../../utils/services/commonService";
import AddModal from "../../../components/AddModal";
import AddRoleForm from "../AddRole/AddRoleForm";

const RoleList = () => {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [pageResponse, setPageResponse] = useState<any>({});
  const dispatch = useDispatch();
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
      const { data } = await getPaginatedList(query, urls.rolesPage, body);
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

  const tableColumn = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
    },
  ];
  const pageConfig: pageConfigProps = {
    title: strings.role,
    addPrivilege: priviledges.add_roles,
    addButtonText: strings.createRole,
    tableColumn: tableColumn,
    hideActionText: false,
    viewPriviledge: priviledges.view_roles,
    detailsRoute: routes.role,
    deletePrivilege: "",
    idColumn: "roleId",
  };

  return (
    <ListPage
      pageConfig={pageConfig}
      handleAddBtnClick={() => setAddModalOpen(true)}
      pageResponse={pageResponse}
      addComponent={
        <AddModal
          addModalOpen={addModalOpen}
          setAddModalOpen={setAddModalOpen}
          headerText={"Create Role"}
        >
          <AddRoleForm
            onSuccess={() => {
              setAddModalOpen(false);
              getList();
            }}
          />
        </AddModal>
      }
    />
  );
};

export default RoleList;
