import { Add, ClearOutlined } from "@mui/icons-material";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Modal,
  Box,
} from "@mui/material";
import strings from "../../constants/strings";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../utils/redux/slices/authenticationSlice";
import { useEffect, useMemo, useState } from "react";
import type { AxiosError } from "axios";
import {
  loading,
  setIsLoading,
  setMessage,
} from "../../utils/redux/slices/commonSlice";
import Loader from "../Loader";
import { getErrorMessage } from "../../utils/helperFunctions/commonHelperFunctions";
import { debounce } from "lodash-es";
import type {
  pageBodyProps,
  ListPageProps,
  sortByProps,
} from "../../constants/types";
import ListTableBody from "./ListTableBody";
import { getPaginatedList } from "../../utils/services/getListService";

const ListPage = ({ pageConfig, addConfig }: ListPageProps) => {
  const { AddComponent } = addConfig;
  const { permissions } = useSelector(userDetails);
  const isLoading = useSelector(loading);
  const [pageResponse, setPageResponse] = useState<any>({});
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<sortByProps>({
    sortBy: "",
    direction: true,
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

  const debouncedSearch = useMemo(
    () => debounce((value: string) => getList(value), 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // clean up on unmount
    };
  }, [debouncedSearch]);
  return (
    <>
      {isLoading && <Loader />}
      <Container
        maxWidth={false}
        sx={{
          "&.MuiContainer-root": {
            pl: 1,
            pr: 0,
          },
        }}
      >
        <Typography variant="h5" mt={2} mb={1} fontWeight={600}>
          {pageConfig.title}
        </Typography>
        <Grid
          container
          alignItems="center"
          justifyContent={"space-between"}
          mb={1}
        >
          <Grid item>
            <TextField
              size="small"
              placeholder={strings.filterInputText}
              variant="outlined"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setQuery(e.target.value);
                debouncedSearch(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            {permissions?.includes(pageConfig.addPrivilege) && (
              <Button
                variant="contained"
                onClick={() => addConfig.setAddModalOpen(true)}
                sx={{ color: "#ffffff", width: "auto" }}
                startIcon={<Add />}
              >
                {pageConfig.addButtonText}
              </Button>
            )}
          </Grid>
        </Grid>
        {pageResponse?.content && (
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
          />
        )}
        {addConfig.addModalOpen && (
          <Modal open={addConfig.addModalOpen}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: "24px 20px",
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h5" fontWeight={600}>
                  {addConfig.headerText}
                </Typography>
                <ClearOutlined
                  onClick={() => addConfig.setAddModalOpen(false)}
                  sx={{ cursor: "pointer" }}
                />
              </Box>
              <AddComponent
                setAddModalOpen={addConfig.setAddModalOpen}
                onSuccess={getList}
              />
            </Box>
          </Modal>
        )}
        {/* {openModal && deleteModal} */}
      </Container>
    </>
  );
};

export default ListPage;
