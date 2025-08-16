import { Visibility, DeleteOutlineOutlined } from "@mui/icons-material";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Stack,
  TableSortLabel,
  Typography,
  TableBody,
  Box,
  TablePagination,
} from "@mui/material";
import strings from "../../constants/strings";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import { useNavigate } from "react-router-dom";
import type {
  ListTableBodyProps,
  tableColumnProps,
} from "../../constants/types";

const ListTableBody = ({
  pageResponse,
  pageConfig,
  usePermissions,
  sortBy,
  handleSort,
  page,
  handleChangePage,
  size,
  pageSizeChange,
  getList,
}: ListTableBodyProps) => {
  const theme = useSelector(getTheme);
  const navigate = useNavigate();
  return (
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
                          column.textAlign === "right" ? "row-reverse" : "row"
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
                              handleSort(column.localField || column.field)
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
                      <TableRow key={item[pageConfig.idColumn]}>
                        {pageConfig.tableColumn.map((row: tableColumnProps) => (
                          <TableCell
                            sx={{
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                            key={row.field}
                          >
                            {row.component ? (
                              <row.component
                                row={row}
                                item={item}
                                getList={getList}
                              />
                            ) : (
                              <Typography>{item[row["field"]]}</Typography>
                            )}
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
                              {usePermissions?.includes(
                                pageConfig.viewPriviledge
                              ) && (
                                <Box
                                  onClick={() =>
                                    navigate(
                                      `${pageConfig.detailsRoute}/${
                                        item[pageConfig.idColumn]
                                      }`
                                    )
                                  }
                                >
                                  <Visibility
                                    fontSize="small"
                                    color="primary"
                                    sx={{ cursor: "pointer" }}
                                  />
                                </Box>
                              )}
                              {usePermissions?.includes(
                                pageConfig.deletePrivilege
                              ) && (
                                <Box sx={{ p: 0, pr: 2 }} onClick={() => {}}>
                                  <DeleteOutlineOutlined
                                    fontSize="small"
                                    color="primary"
                                    sx={{ cursor: "pointer" }}
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
  );
};

export default ListTableBody;
