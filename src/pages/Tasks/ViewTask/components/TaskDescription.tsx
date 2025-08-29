import { Box } from "@mui/material";
import type { UpdateableTaskComponentProps } from "../../../../constants/types";
import { useState } from "react";
import CollapseHeading from "./CollapseHeading";
import { useSelector } from "react-redux";
import { getTheme } from "../../../../utils/redux/slices/commonSlice";
import TextEditor from "../../../../components/TextEditor";
import EditModeButtonGroup2 from "./EditModeButtonGroup2";

const TaskDescription = ({
  selectedTask,
  updateTask,
}: UpdateableTaskComponentProps) => {
  const theme = useSelector(getTheme);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { taskDescription } = selectedTask;
  const [value, setValue] = useState<string>(taskDescription);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCancel = () => {
    setValue(taskDescription);
    setIsEditMode(false);
  };
  const onSave = () => {
    updateTask("taskDescription", value, setLoading, setIsEditMode);
  };
  return (
    <Box my={3}>
      <Box mb={2}>
        <CollapseHeading
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          headingText="Description"
        />
      </Box>
      {collapsed ? null : (
        <Box minHeight={"270px"} sx={{ overflowY: "auto" }}>
          {isEditMode ? (
            <>
              <TextEditor
                value={value}
                onChange={(value: string) => setValue(value)}
              />
              <EditModeButtonGroup2
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
                  cursor: "pointer",
                  backgroundColor: theme.secondaryColor2,
                },
              }}
              onClick={() => setIsEditMode(true)}
            >
              <div dangerouslySetInnerHTML={{ __html: taskDescription }} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default TaskDescription;
