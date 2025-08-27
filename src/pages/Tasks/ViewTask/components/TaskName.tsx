import { Box, TextField, Typography } from "@mui/material";
import type { UpdateableTaskComponentProps } from "../../../../constants/types";
import { useState } from "react";
import EditModeButtonGroup from "./EditModeButtonGroup";
import { useSelector } from "react-redux";
import { getTheme } from "../../../../utils/redux/slices/commonSlice";

const TaskName = ({
  selectedTask,
  updateTask,
}: UpdateableTaskComponentProps) => {
  const theme = useSelector(getTheme);
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
        <Box
          sx={{
            p: 0.7,
            borderRadius: 1,
            ":hover": {
              backgroundColor: theme.secondaryColor2,
            },
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            letterSpacing={0.8}
            onClick={() => setIsEditMode(true)}
            sx={{ cursor: "pointer" }}
          >
            {taskName}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default TaskName;
