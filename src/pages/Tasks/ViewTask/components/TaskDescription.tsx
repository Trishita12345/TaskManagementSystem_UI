import { Box, TextField, Typography } from "@mui/material";
import type { UpdateableTaskComponentProps } from "../../../../constants/types";
import { useState } from "react";
import EditModeButtonGroup from "./EditModeButtonGroup";

const TaskDescription = ({
  selectedTask,
  updateTask,
}: UpdateableTaskComponentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { taskDescription } = selectedTask;
  const [value, setValue] = useState<string>(taskDescription);

  const onCancel = () => {
    setValue(taskDescription);
    setIsEditMode(false);
  };
  const onSave = () => {
    updateTask("taskDescription", value, setLoading, setIsEditMode);
  };
  return (
    <Box my={3}>
      <Typography mb={1.5}>Description</Typography>
      {isEditMode ? (
        <>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            size="small"
            multiline
            minRows={6}
            maxRows={10}
          />
          <EditModeButtonGroup
            loading={loading}
            onCancel={onCancel}
            onSave={onSave}
          />
        </>
      ) : (
        <Box onClick={() => setIsEditMode(true)}>
          <Typography>{taskDescription}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TaskDescription;
