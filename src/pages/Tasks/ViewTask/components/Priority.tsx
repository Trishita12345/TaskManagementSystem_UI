import {
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Box,
  Typography,
} from "@mui/material";
import type {
  dropdownDataProps,
  UpdateableTaskComponentProps,
} from "../../../../constants/types";
import TaskDetailsLabelValue from "./TaskDetailsLabelValue";
import {
  DropdownLabel,
  PriorityIconMap,
} from "../../../../utils/helperFunctions/dropdownHelper";
import { useSelector } from "react-redux";
import { priorityList } from "../../../../utils/redux/slices/taskSlice";
import { useState } from "react";

const Priority = ({
  selectedTask,
  updateTask,
}: UpdateableTaskComponentProps) => {
  const { priority } = selectedTask;
  const priorities = useSelector(priorityList);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  return (
    <TaskDetailsLabelValue
      label={"Priority"}
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
                value={priority}
                size="small"
                label=""
                onBlur={() => setIsEditMode(false)}
                onChange={(event: SelectChangeEvent) => {
                  updateTask(
                    "priority",
                    event.target.value,
                    undefined,
                    setIsEditMode
                  );
                }}
              >
                {priorities.map((p: dropdownDataProps) => (
                  <MenuItem key={p.value} value={p.value}>
                    <DropdownLabel
                      Icon={<PriorityIconMap priority={p.value} />}
                      label={p.label}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              onClick={() => setIsEditMode(true)}
              sx={{ cursor: "pointer" }}
            >
              {<PriorityIconMap priority={priority} />}
              <Typography>{priority}</Typography>
            </Box>
          )}
        </>
      }
    />
  );
};

export default Priority;
