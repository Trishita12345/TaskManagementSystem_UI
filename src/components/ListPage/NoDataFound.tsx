import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { userDetails } from "../../utils/redux/slices/authenticationSlice";
import type { pageConfigProps } from "../../constants/types";
import { useSearchParams } from "react-router-dom";
import { loading } from "../../utils/redux/slices/commonSlice";

interface NoResultsFoundProps {
  handleAddBtnClick: any;
  pageConfig: pageConfigProps;
}
export default function NoResultsFound({
  handleAddBtnClick,
  pageConfig,
}: NoResultsFoundProps) {
  const isLoading = useSelector(loading);
  const { permissions } = useSelector(userDetails);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetQuery = (query: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("query", query);
    setSearchParams(newParams);
  };

  const query = searchParams.get("query") || "";

  const getText = () => {
    if (query) return "Try searching again by clearing filter.";
    else if (query === "" && permissions.includes(pageConfig.addPrivilege))
      return "Try creating a new data";
    else return "Please contact with admin for more details";
  };
  return (
    <>
      {isLoading || (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="65vh"
          textAlign="center"
          px={2}
        >
          <img
            style={{ width: "40%" }}
            src="https://images.unsplash.com/vector-1743473329244-f81d2c2a18f4?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Typography
            variant="h2"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            No Data Found
          </Typography>

          {/* Subtitle */}
          <Typography variant="h6" mb={3}>
            {pageConfig.noDataHelperText ||
              "We couldn't find what you searched for."}{" "}
            <br />
            {getText()}
          </Typography>

          {/* Optional Action Button */}
          {query && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSetQuery("")}
            >
              Clear Filter
            </Button>
          )}
          {query === "" && permissions.includes(pageConfig.addPrivilege) && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddBtnClick}
            >
              {pageConfig.addButtonText}
            </Button>
          )}
        </Box>
      )}
    </>
  );
}
