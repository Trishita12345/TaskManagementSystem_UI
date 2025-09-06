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
  TypeIconMap,
} from "../../../../utils/helperFunctions/dropdownHelper";
import { useSelector } from "react-redux";
import { taskTypeList } from "../../../../utils/redux/slices/taskSlice";
import { useState } from "react";

const TaskType = ({
  selectedTask,
  updateTask,
}: UpdateableTaskComponentProps) => {
  const { type } = selectedTask;
  const types = useSelector(taskTypeList);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  return (
    <TaskDetailsLabelValue
      label={"TaskType"}
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
                value={type}
                size="small"
                label=""
                onBlur={() => setIsEditMode(false)}
                onChange={(event: SelectChangeEvent) => {
                  updateTask(
                    "type",
                    event.target.value,
                    undefined,
                    setIsEditMode
                  );
                }}
              >
                {types.map((t: dropdownDataProps) => (
                  <MenuItem key={t.value} value={t.value}>
                    <DropdownLabel
                      Icon={<TypeIconMap type={t.value} />}
                      label={t.label}
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
              <TypeIconMap type={type} />
              <Typography>{type}</Typography>
            </Box>
          )}
        </>
      }
    />
  );
};

export default TaskType;
