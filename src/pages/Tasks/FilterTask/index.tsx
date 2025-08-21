import { useDispatch, useSelector } from "react-redux";
import strings from "../../../constants/strings";
import useScreenSize from "../../../utils/customHooks/useScreenSize";
import { Box, Button, Typography } from "@mui/material";
import { getTheme } from "../../../utils/redux/slices/commonSlice";
import FilterInput from "../../../components/FilterInput";
import {
  selectedEmployeeIds,
  setClearFilter,
  setEmpIdsForFilter,
  setOnlyCurrentEmpIdForFilter,
  taskQuery,
} from "../../../utils/redux/slices/taskSlice";
import {
  selectedProjectDetails,
  userDetails,
} from "../../../utils/redux/slices/authenticationSlice";
import GroupAvatars from "../../../components/GroupAvatars";
import PopOverContent from "./PopOverContent";

const FilterTask = ({}: any) => {
  const theme = useSelector(getTheme);
  const { employeeId } = useSelector(userDetails);
  const { width } = useScreenSize();
  const query = useSelector(taskQuery);
  const empIdsForFilter = useSelector(selectedEmployeeIds);
  const dispatch = useDispatch();
  const { employees } = useSelector(selectedProjectDetails);

  const selectCurrentUserForFilter = () => {
    dispatch(setOnlyCurrentEmpIdForFilter(employeeId));
  };

  const onClear = () => {
    dispatch(setClearFilter());
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: width > 700 ? "center" : "start",
        gap: "12px",
        flexDirection: width > 700 ? "row" : "column",
      }}
    >
      <FilterInput />
      <GroupAvatars
        avatars={employees}
        PopOverContent={PopOverContent}
        selectedAvatars={empIdsForFilter}
        handleSelectAvatar={(empId: string) =>
          dispatch(setEmpIdsForFilter(empId))
        }
      />
      <Box
        sx={{
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
      </Box>
    </Box>
  );
};

export default FilterTask;
