import { Add, AddOutlined } from "@mui/icons-material";
import { Container, Grid, Button, Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../utils/redux/slices/authenticationSlice";
import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import {
  loading,
  setIsLoading,
  setMessage,
} from "../../utils/redux/slices/commonSlice";
import Loader from "../Loader";
import { getErrorMessage } from "../../utils/helperFunctions/commonHelperFunctions";
import type {
  pageBodyProps,
  ListPageProps,
  sortByProps,
  tableColumnProps,
} from "../../constants/types";
import ListTableBody from "./ListTableBody";
import { getPaginatedList } from "../../utils/services/getListService";
import PageHeader from "../PageHeader";
import NoResultsFound from "./NoDataFound";
import AddModal from "./AddModal";
import FilterInput from "../FilterInput";
import useScreenSize from "../../utils/customHooks/useScreenSize";
import SortByButton from "./SortByButton";

const ListPage = ({ pageConfig, addConfig }: ListPageProps) => {
  const { width } = useScreenSize();
  const { permissions } = useSelector(userDetails);
  const isLoading = useSelector(loading);
  const [pageResponse, setPageResponse] = useState<any>({});
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<sortByProps>({
    sortBy: "",
    direction: true, //'desc'
  });
  const dispatch = useDispatch();
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const pageSizeChange = (event: any) => {
    const value = event.target.value;
    setPage(0);
    setSize(value);
  };

  const handleSort = async (field: string) => {
    let { direction } = sortBy;
    setSortBy({
      sortBy: field,
      direction: !direction,
    });
  };

  const getList = async (queryVal: string) => {
    let body: pageBodyProps = {
      page: page,
      size: size,
      direction: sortBy.direction ? "desc" : "asc",
    } as any;

    if (sortBy.sortBy !== "") {
      body = { ...body, sortBy: sortBy.sortBy };
    }
    try {
      dispatch(setIsLoading(true));
      const { data } = await getPaginatedList(
        queryVal || query,
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
    getList(query);
  }, [page, size, sortBy]);

  const sortByCofig = pageConfig.tableColumn
    .filter((tc: tableColumnProps) => tc.sortable)
    .map((tc: tableColumnProps) => ({
      label: tc.headerName,
      field: tc.localField || tc.field,
      dataType: tc.dataType || "string",
    }));

  return (
    <>
      {isLoading && <Loader />}
      <Container
        maxWidth={false}
        sx={{
          "&.MuiContainer-root": {
            pl: 0,
            pr: 0,
          },
        }}
      >
        <Box my={2}>
          <PageHeader label={pageConfig.title} />
        </Box>
        {pageResponse?.content && (
          <>
            {pageResponse?.content?.length > 0 ? (
              <>
                <Grid
                  container
                  alignItems="center"
                  justifyContent={"space-between"}
                  mt={4}
                  mb={1}
                >
                  <Grid item>
                    <FilterInput
                      query={query}
                      setQuery={setQuery}
                      filterFunc={getList}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container gap={width > 600 ? 3 : 0}>
                      <SortByButton
                        sortByConfig={sortByCofig}
                        setSortBy={setSortBy}
                      />
                      {permissions?.includes(pageConfig.addPrivilege) && (
                        <>
                          {width > 600 ? (
                            <Button
                              variant="contained"
                              onClick={addConfig?.handleAddBtnClick}
                              sx={{ color: "#ffffff", width: "auto" }}
                              startIcon={<Add />}
                            >
                              {pageConfig.addButtonText}
                            </Button>
                          ) : (
                            <IconButton onClick={addConfig?.handleAddBtnClick}>
                              <AddOutlined color="primary" />
                            </IconButton>
                          )}
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <ListTableBody
                  pageResponse={pageResponse}
                  pageConfig={pageConfig}
                  usePermissions={permissions}
                  sortBy={sortBy}
                  handleSort={handleSort}
                  page={page}
                  handleChangePage={handleChangePage}
                  size={size}
                  pageSizeChange={pageSizeChange}
                  getList={getList}
                />
              </>
            ) : (
              <NoResultsFound
                query={query}
                setQuery={setQuery}
                addConfig={addConfig}
                pageConfig={pageConfig}
              />
            )}
          </>
        )}
        {addConfig && addConfig.addModalOpen && (
          <AddModal addConfig={addConfig} getList={getList} />
        )}
        {/* {openModal && deleteModal} */}
      </Container>
    </>
  );
};

export default ListPage;
