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
} from "@mui/material";
import strings from "../../constants/strings";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import type {
  ListTableBodyProps,
  tableColumnProps,
} from "../../constants/types";
import { userDetails } from "../../utils/redux/slices/authenticationSlice";

const ListTableBody = ({ pageResponse, pageConfig }: ListTableBodyProps) => {
  const { permissions } = useSelector(userDetails);
  const theme = useSelector(getTheme);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sortby = searchParams.get("sortby") || "";
  const dir = searchParams.get("dir") || "desc";
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{
            ".MuiTableCell-root": {
              borderRadius: 0,
              paddingY: 1.2,
            },
          }}
        >
          <TableHead>
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
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <TableSortLabel
                        sx={{ cursor: "default" }}
                        hideSortIcon={!column.sortable}
                        active={
                          sortby === (column?.localField || column?.field)
                        }
                        direction={dir as "desc" | "asc"}
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
                          // whiteSpace: "nowrap",
                        }}
                        key={row.field}
                      >
                        <Typography>{item[row["field"]]}</Typography>
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
                          {permissions?.includes(pageConfig.viewPriviledge) && (
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
                          {permissions?.includes(
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
    </>
  );
};

export default ListTableBody;
