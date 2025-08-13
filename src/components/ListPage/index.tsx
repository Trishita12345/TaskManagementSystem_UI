import { Visibility, DeleteOutlineOutlined, Add } from "@mui/icons-material";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Stack,
  TableSortLabel,
  TableBody,
  Box,
  TablePagination,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import strings from "../../constants/strings";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../utils/redux/slices/authenticationSlice";
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../utils/axios";
import type { AxiosError } from "axios";
import {
  getTheme,
  loading,
  setIsLoading,
  setMessage,
} from "../../utils/redux/slices/commonSlice";
import Loader from "../Loader";
import { createPageUrl, getErrorMessage } from "../../utils/helperFunctions";
import { debounce } from "lodash-es";

interface tableColumnProps {
  field: string;
  headerName: string;
  textAlign?: "left" | "right";
  localField?: string;
  sortable?: boolean;
}
interface pageConfigProps {
  title: string;
  listPageUrl: string;
  addPrivilege: string;
  addButtonRoute: string;
  addButtonText: string;
  tableColumn: tableColumnProps[];
  hideActionText?: boolean;
  viewPriviledge: string;
  detailsRoute: string;
  deletePrivilege: string;
}
interface ListPageProps {
  pageConfig: pageConfigProps;
}
interface bodyProps {
  page: number;
  size: number;
  sortBy: string;
  direction: string;
}

const ListPage = ({ pageConfig }: ListPageProps) => {
  const theme = useSelector(getTheme);
  const { permissions } = useSelector(userDetails);
  const isLoading = useSelector(loading);
  const [pageResponse, setPageResponse] = useState<any>({});
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<{ sortBy: string; direction: boolean }>({
    sortBy: "",
    direction: true,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const pageSizeChange = (event: any) => {
    const value = event.target.value;
    setPage(0);
    setSize(value);
  };

  const handleSort = async (field: any) => {
    let { direction } = sortBy;
    setSortBy({
      sortBy: field,
      direction: !direction,
    });
  };

  const getList = async (query: string) => {
    let body: bodyProps = {
      page: page,
      size: size,
      direction: sortBy.direction ? "desc" : "asc",
    } as any;

    if (sortBy.sortBy !== "") {
      body = { ...body, sortBy: sortBy.sortBy };
    }
    try {
      const url = createPageUrl(query, pageConfig.listPageUrl);
      dispatch(setIsLoading(true));
      const { data } = await axiosInstance.post(url, body);
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
                onClick={() => navigate(pageConfig.addButtonRoute)}
                sx={{ color: "#ffffff", width: "auto" }}
                startIcon={<Add />}
              >
                {pageConfig.addButtonText}
              </Button>
            )}
          </Grid>
        </Grid>
        {pageResponse?.content && (
          <>
            {pageResponse?.content?.length > 0 && (
              <>
                <TableContainer component={Paper}>
                  <Table stickyHeader>
                    <TableHead
                      sx={{
                        ".MuiTableCell-root": {
                          backgroundColor: `${theme.primary}${theme.opacity}`,
                          height: "58px",
                          borderRadius: 0,
                        },
                      }}
                    >
                      <TableRow>
                        {pageConfig.tableColumn.map((column: any) => (
                          <TableCell
                            key={column.field}
                            sx={{
                              ".MuiTableSortLabel-icon": {
                                color: `${theme.primary}!important`,
                              },
                            }}
                          >
                            <Stack
                              direction={
                                column.textAlign === "right"
                                  ? "row-reverse"
                                  : "row"
                              }
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                              >
                                <TableSortLabel
                                  hideSortIcon={!column?.sortable}
                                  active={sortBy.sortBy === column?.field}
                                  direction={sortBy.direction ? "desc" : "asc"}
                                  onClick={() =>
                                    handleSort(
                                      column.localField || column.field
                                    )
                                  }
                                >
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={0.5}
                                  >
                                    <Typography
                                      whiteSpace="nowrap"
                                      fontWeight={600}
                                      fontSize="14px"
                                    >
                                      {column.headerName}
                                    </Typography>
                                  </Stack>
                                </TableSortLabel>
                              </Stack>
                            </Stack>
                          </TableCell>
                        ))}
                        {!pageConfig.hideActionText && (
                          <TableCell
                            sx={{
                              textAlign: "right",
                            }}
                          >
                            <Typography fontWeight={600} fontSize="14px">
                              {strings.action_text}
                            </Typography>
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pageResponse?.content?.length > 0 &&
                        pageResponse?.content?.map((item: any) => {
                          return (
                            <TableRow key={item.id}>
                              {pageConfig.tableColumn.map((row: any) => (
                                <TableCell
                                  sx={{
                                    textAlign: "left",
                                    whiteSpace: "nowrap",
                                  }}
                                  key={row.field}
                                >
                                  {item[row["field"]]}
                                </TableCell>
                              ))}
                              {!pageConfig.hideActionText && (
                                <TableCell
                                  className="last-row"
                                  sx={{
                                    textAlign: "right",
                                    div: {
                                      display: "flex",
                                      justifyContent: "end",
                                      verticalAlign: "middle",
                                    },
                                  }}
                                >
                                  <Stack
                                    sx={{ alignItems: "flex-start" }}
                                    direction="row"
                                    spacing={2}
                                  >
                                    {permissions?.includes(
                                      pageConfig.viewPriviledge
                                    ) && (
                                      <Box
                                        onClick={() =>
                                          navigate(pageConfig.detailsRoute)
                                        }
                                      >
                                        <Visibility
                                          fontSize="small"
                                          color="primary"
                                        />
                                      </Box>
                                    )}
                                    {permissions?.includes(
                                      pageConfig.deletePrivilege
                                    ) && (
                                      <Box
                                        sx={{ p: 0, pr: 2 }}
                                        onClick={() => delete item.id}
                                      >
                                        <DeleteOutlineOutlined
                                          fontSize="small"
                                          color="primary"
                                        />
                                      </Box>
                                    )}
                                  </Stack>
                                </TableCell>
                              )}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={pageResponse.numberOfElements}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={size}
                  onRowsPerPageChange={pageSizeChange}
                />
              </>
            )}
            {pageResponse?.content?.length == 0 && (
              <Typography
                sx={{
                  p: 2,
                  mt: 5,
                  borderRadius: 1,
                }}
                variant="h6"
              >
                {strings.no_data_available}
              </Typography>
            )}
          </>
        )}
        {/* {openModal && deleteModal} */}
      </Container>
    </>
  );
};

export default ListPage;
