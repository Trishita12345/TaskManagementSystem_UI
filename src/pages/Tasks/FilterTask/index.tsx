import { useDispatch, useSelector } from "react-redux";
import AvatarGroup from "./AvatarGroup";
import strings from "../../../constants/strings";
import useScreenSize from "../../../utils/customHooks/useScreenSize";
import { Button, Typography } from "@mui/material";
import { getTheme } from "../../../utils/redux/slices/commonSlice";
import FilterInput from "../../../components/FilterInput";
import {
  selectedEmployeeIds,
  setClearFilter,
  setEmpIdsForFilter,
  setOnlyCurrentEmpIdForFilter,
  setTaskFilterQuery,
  taskQuery,
} from "../../../utils/redux/slices/taskSlice";
import { userDetails } from "../../../utils/redux/slices/authenticationSlice";

const FilterTask = ({}: any) => {
  const theme = useSelector(getTheme);
  const { empId } = useSelector(userDetails);
  const { width } = useScreenSize();
  const query = useSelector(taskQuery);
  const empIdsForFilter = useSelector(selectedEmployeeIds);
  const dispatch = useDispatch();

  const handleSelectUser = (empId: string) => {
    dispatch(setEmpIdsForFilter(empId));
  };

  const selectCurrentUserForFilter = () => {
    dispatch(setOnlyCurrentEmpIdForFilter(empId));
  };

  const onClear = () => {
    dispatch(setClearFilter());
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: width > 700 ? "center" : "start",
        gap: "12px",
        flexDirection: width > 700 ? "row" : "column",
      }}
    >
      <FilterInput
        query={query}
        setQuery={(val: string) => dispatch(setTaskFilterQuery(val))}
        filterFunc={(val: string) => {
          console.log(val);
        }}
      />
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
        {query !== "" || empIdsForFilter.length > 0 ? (
          <Button onClick={onClear}>
            <Typography>{strings.clearAll}</Typography>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default FilterTask;
