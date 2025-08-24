import { TextField, Typography } from "@mui/material";
import type { UpdateableTaskComponentProps } from "../../../../constants/types";
import { useState } from "react";
import EditModeButtonGroup from "./EditModeButtonGroup";

const TaskName = ({
  selectedTask,
  updateTask,
}: UpdateableTaskComponentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { taskName } = selectedTask;
  const [value, setValue] = useState<string>(taskName);

  const onCancel = () => {
    setValue(taskName);
    setIsEditMode(false);
  };
  const onSave = () => {
    updateTask("taskName", value, setLoading, setIsEditMode);
  };
  return (
    <>
      {isEditMode ? (
        <>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            size="small"
          />
          <EditModeButtonGroup
            loading={loading}
            onCancel={onCancel}
            onSave={onSave}
          />
        </>
      ) : (
        <Typography
          variant="h5"
          fontWeight={600}
          letterSpacing={0.8}
          onClick={() => setIsEditMode(true)}
          sx={{ cursor: "pointer" }}
        >
          {taskName}
        </Typography>
      )}
    </>
  );
};

export default TaskName;
