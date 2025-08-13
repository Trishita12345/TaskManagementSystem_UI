import { Visibility, DeleteOutlineOutlined } from "@mui/icons-material";
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
  IconButton,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import strings from "../../constants/strings";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../utils/redux/slices/authenticationSlice";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import type { AxiosError } from "axios";
import {
  loading,
  setIsLoading,
  setMessage,
} from "../../utils/redux/slices/commonSlice";
import Loader from "../Loader";
import { createPageUrl } from "../../utils/helperFunctions";

interface pageConfigProps {
  title: string;
  listPageUrl: string;
  addPrivilege: string;
  addButtonRoute: string;
  addButtonText: string;
  tableColumn: any[];
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

  const handleSort = async (field: any, direction: any) => {
    setSortBy({
      sortBy: field,
      direction: direction,
    });
  };

  const getList = async (query: string, body: bodyProps) => {
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
          message: err.response?.data.message || err,
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  useEffect(() => {
    let body = {
      page: page,
      size: size,
      direction: sortBy.direction ? "desc" : "asc",
    } as any;

    if (sortBy.sortBy !== "") {
      body = { ...body, sortBy: sortBy.sortBy };
    }
    getList(query, body);
  }, [query, page, size, sortBy]);

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
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Typography>{pageConfig.title}</Typography>
          </Grid>
          <Grid item>
            {permissions?.includes(pageConfig.addPrivilege) && (
              <Button
                variant="contained"
                onClick={() => navigate(pageConfig.addButtonRoute)}
                sx={{ color: "#ffffff", width: "auto" }}
              >
                {pageConfig.addButtonText}
              </Button>
            )}
          </Grid>
        </Grid>
        {pageResponse?.content && (
          <>
            {pageResponse?.content?.length > 0 && (
              <Paper
                sx={{ width: "100%", overflow: "hidden", borderRadius: 0 }}
              >
                <TableContainer
                  sx={{
                    borderRadius: 0,
                  }}
                  component={Paper}
                >
                  <Table stickyHeader>
                    <TableHead
                      sx={{
                        ".MuiTableCell-root": {
                          //   backgroundColor: theme.palette.secondary.main,
                          //   color: theme.palette.secondary.contrastText,
                          //   border: `1px solid ${theme.palette.secondary.main}`,
                          height: "58px",
                          borderRadius: 0,
                          //   ".MuiTableSortLabel-root:active, .MuiTableSortLabel-root:hover, .MuiTableSortLabel-root:focus":
                          //     {
                          //       color: theme.palette.secondary.contrastText,
                          //     },
                        },
                      }}
                    >
                      <TableRow>
                        {pageConfig.tableColumn.map((column: any) => (
                          <TableCell key={column.field}>
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
                                  //   active={
                                  //     pageConfig?.sortValue?.sortBy === column?.field
                                  //   }
                                  direction={sortBy.direction ? "desc" : "asc"}
                                  onClick={() =>
                                    column?.sortable
                                      ? handleSort(
                                          column.localField || column.field,
                                          sortBy.direction
                                        )
                                      : {}
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
                              {pageConfig.tableColumn.map((row: any) => {
                                return (
                                  <>
                                    {row.image ? (
                                      <TableCell padding="checkbox">
                                        {row.image && (
                                          <img
                                            src={item[row["field"]]}
                                            alt=""
                                            height="30px"
                                            width="30px"
                                          />
                                        )}
                                      </TableCell>
                                    ) : (
                                      <TableCell
                                        sx={{
                                          textAlign: "left",
                                          whiteSpace: "nowrap",
                                        }}
                                        key={row.field}
                                      >
                                        {item[row["field"]]}
                                      </TableCell>
                                    )}
                                  </>
                                );
                              })}
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
                <Grid
                  container
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  pr={2}
                >
                  {/* <TablePaginationActions
                count={pageResponse.totalElements}
                rowsPerPage={size}
                page={page}
                onRowsPerPageChange={pageSizeChange}
                onPageChange={handleChangePage}
              /> */}
                  {<Typography>Current Page: {page + 1}</Typography>}
                </Grid>
              </Paper>
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
