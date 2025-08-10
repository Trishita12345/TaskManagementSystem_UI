import FilterInput from "./FilterInput";
import { useSelector } from "react-redux";
import AvatarGroup from "./AvatarGroup";
import strings from "../../../constants/strings";
import useScreenSize from "../../../utils/customHooks/useScreenSize";
import { employeeData } from "../../../constants/data";
import { Button, Typography } from "@mui/material";
import { getTheme } from "../../../utils/redux/slices/commonSlice";

const FilterTask = ({
  handleFilterInputChange,
  handleSelectUser,
  onClear,
  selectCurrentUserForFilter,
}) => {
  const theme = useSelector(getTheme);
  const { width } = useScreenSize();
  const taskFilterString = useSelector(
    (state) => state.taskSlice.taskFilterString
  );
  const empIdsForFilter = useSelector(
    (state) => state.taskSlice.empIdsForFilter
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: width > 700 ? "center" : "start",
        gap: "12px",
        flexDirection: width > 700 ? "row" : "column",
      }}
    >
      <FilterInput handleFilterInputChange={handleFilterInputChange} />
      <div style={{ width: "190px" }}>
        <AvatarGroup handleSelectUser={handleSelectUser} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontWeight: 500,
        }}
      >
        <Button onClick={selectCurrentUserForFilter}>
          <Typography>{strings.onlyMyIssues}</Typography>
        </Button>
        <Typography color={theme.primary}>|</Typography>
        {taskFilterString !== "" || empIdsForFilter.length > 0 ? (
          <Button onClick={onClear}>
            <Typography>{strings.clearAll}</Typography>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default FilterTask;
