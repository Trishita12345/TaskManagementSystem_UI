import {
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Link,
  Grid,
  Box,
} from "@mui/material";
import type {
  EmployeeSummaryType,
  UpdateableTaskComponentProps,
} from "../../../../constants/types";
import TaskDetailsLabelValue from "./TaskDetailsLabelValue";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getEmployeesWithDefalult } from "../../../../utils/helperFunctions/commonHelperFunctions";
import {
  selectedProjectDetails,
  userDetails,
} from "../../../../utils/redux/slices/authenticationSlice";
import FullNameComponent from "../../../../components/FullNameComponent";
import { getTheme } from "../../../../utils/redux/slices/commonSlice";

const Assignee = ({
  selectedTask,
  updateTask,
}: UpdateableTaskComponentProps) => {
  const theme = useSelector(getTheme);
  const loggedInUser = useSelector(userDetails);
  const { assignedTo } = selectedTask;
  const { employeeId } = assignedTo;
  const { employees } = useSelector(selectedProjectDetails);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  return (
    <Grid container>
      <TaskDetailsLabelValue
        label={"Assignee"}
        Component={
          <>
            {isEditMode ? (
              <FormControl fullWidth>
                <Select
                  sx={{
                    ".MuiOutlinedInput-input": {
                      p: 0.5,
                    },
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={employeeId}
                  size="small"
                  label=""
                  onBlur={() => setIsEditMode(true)}
                  onChange={(event: SelectChangeEvent) => {
                    updateTask(
                      "assignedTo",
                      event.target.value === "unassigned"
                        ? null
                        : event.target.value,
                      undefined,
                      setIsEditMode
                    );
                  }}
                >
                  {getEmployeesWithDefalult(employees).map(
                    (item: EmployeeSummaryType) => (
                      <MenuItem value={item.employeeId}>
                        <FullNameComponent
                          employeeDetails={item}
                          avatarHeight={20}
                          avatarWeight={20}
                          svgIconSize="12px"
                        />
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            ) : (
              <Box onClick={() => setIsEditMode(true)}>
                <FullNameComponent
                  employeeDetails={assignedTo}
                  avatarHeight={20}
                  avatarWeight={20}
                  svgIconSize="12px"
                />
              </Box>
            )}
          </>
        }
      />
      {loggedInUser.employeeId !== employeeId && (
        <Link
          underline="hover"
          ml={"100px"}
          color={theme.primary}
          onClick={() => updateTask("assignedTo", loggedInUser.employeeId)}
        >
          Assign to me
        </Link>
      )}
    </Grid>
  );
};

export default Assignee;
