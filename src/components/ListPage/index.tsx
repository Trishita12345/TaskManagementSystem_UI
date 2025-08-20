import { Add, AddOutlined } from "@mui/icons-material";
import {
  Container,
  Grid,
  Button,
  Box,
  IconButton,
  TablePagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import { userDetails } from "../../utils/redux/slices/authenticationSlice";
import { loading } from "../../utils/redux/slices/commonSlice";
import Loader from "../Loader";
import type { ListPageProps, tableColumnProps } from "../../constants/types";
import ListTableBody from "./ListTableBody";
import PageHeader from "../PageHeader";
import NoResultsFound from "./NoDataFound";
import FilterInput from "../FilterInput";
import useScreenSize from "../../utils/customHooks/useScreenSize";
import SortByButton from "./SortByButton";
import { useSearchParams } from "react-router-dom";

const ListPage = ({
  pageConfig,
  handleAddBtnClick,
  pageResponse,
  addComponent,
}: ListPageProps) => {
  const { width } = useScreenSize();
  const { permissions } = useSelector(userDetails);
  const isLoading = useSelector(loading);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || "0";
  const size = searchParams.get("size") || "10";

  const handleChangePage = (_event: unknown, newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };

  const pageSizeChange = (event: any) => {
    const value = event.target.value;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", "0");
    newParams.set("size", value);
    setSearchParams(newParams);
  };

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
        <Grid
          container
          alignItems="center"
          justifyContent={"space-between"}
          mt={4}
          mb={1}
        >
          <Grid item>
            <FilterInput />
          </Grid>
          <Grid item>
            <Grid container gap={width > 600 ? 3 : 0}>
              <SortByButton sortByConfig={sortByCofig} />
              {permissions?.includes(pageConfig.addPrivilege) &&
                handleAddBtnClick && (
                  <>
                    {width > 600 ? (
                      <Button
                        variant="contained"
                        onClick={handleAddBtnClick}
                        sx={{ color: "#ffffff", width: "auto" }}
                        startIcon={<Add />}
                      >
                        {pageConfig.addButtonText}
                      </Button>
                    ) : (
                      <IconButton onClick={handleAddBtnClick}>
                        <AddOutlined color="primary" />
                      </IconButton>
                    )}
                  </>
                )}
            </Grid>
          </Grid>
        </Grid>
        {pageResponse?.content && pageResponse?.content?.length > 0 ? (
          <>
            <ListTableBody
              pageResponse={pageResponse}
              pageConfig={pageConfig}
            />
            <TablePagination
              component="div"
              count={pageResponse.totalElements}
              page={parseInt(page)}
              onPageChange={handleChangePage}
              rowsPerPage={parseInt(size)}
              onRowsPerPageChange={pageSizeChange}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </>
        ) : (
          <NoResultsFound
            handleAddBtnClick={handleAddBtnClick}
            pageConfig={pageConfig}
          />
        )}
        {addComponent && <>{addComponent}</>}
      </Container>
    </>
  );
};

export default ListPage;
