import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useSelector } from "react-redux";
import { userDetails } from "../../utils/redux/slices/authenticationSlice";
import type { addConfigProps, pageConfigProps } from "../../constants/types";
import { useSearchParams } from "react-router-dom";

interface NoResultsFoundProps {
  addConfig: addConfigProps | undefined;
  pageConfig: pageConfigProps;
}
export default function NoResultsFound({
  addConfig,
  pageConfig,
}: NoResultsFoundProps) {
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
    else if (
      query === "" &&
      permissions.includes(pageConfig.addPrivilege) &&
      addConfig
    )
      return "Try creating a new data";
    else return "Please contact with admin for more details";
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      textAlign="center"
      px={2}
    >
      <SearchOffIcon sx={{ fontSize: 200, color: "#90a4ae", mb: 2 }} />

      <Typography variant="h2" fontWeight="bold" color="primary" gutterBottom>
        No results found
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
      {query === "" &&
        permissions.includes(pageConfig.addPrivilege) &&
        addConfig && (
          <Button
            variant="contained"
            color="primary"
            onClick={addConfig?.handleAddBtnClick}
          >
            {pageConfig.addButtonText}
          </Button>
        )}
    </Box>
  );
}
