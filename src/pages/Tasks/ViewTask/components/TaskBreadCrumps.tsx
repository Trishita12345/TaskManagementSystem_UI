import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import type {
  dropdownDataProps,
  UpdateableTaskComponentProps,
} from "../../../../constants/types";
import {
  DropdownLabel,
  TypeIconMap,
} from "../../../../utils/helperFunctions/dropdownHelper";
import { ClearOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../constants/routes";
import { useSelector } from "react-redux";
import { selectedProjectDetails } from "../../../../utils/redux/slices/authenticationSlice";
import { getTheme } from "../../../../utils/redux/slices/commonSlice";
import ProjectBreadcrumbs from "../../../../components/ProjectBreadcrumbs";
import { useState } from "react";
import { taskTypeList } from "../../../../utils/redux/slices/taskSlice";

const TaskBreadCrumps = ({
  selectedTask,
  updateTask,
}: UpdateableTaskComponentProps) => {
  const theme = useSelector(getTheme);
  const navigate = useNavigate();
  const types = useSelector(taskTypeList);
  const { taskId, type } = selectedTask;
  const { projectId, name } = useSelector(selectedProjectDetails);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value?: string) => {
    setAnchorEl(null);
    if (value) {
      updateTask("type", value);
    }
  };
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      onClick={() => navigate(routes.projectList)}
    >
      Projects
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      onClick={() => navigate(`${routes.viewEditProject}/${projectId}`)}
    >
      {name}
    </Link>,
    <Link
      underline="none"
      key="3"
      color={theme.secondaryContrast}
      sx={{ cursor: "default", fontWeight: 500 }}
    >
      <Box display={"flex"} gap={1} alignItems={"center"}>
        <Button onClick={handleClick} sx={{ p: 0, minWidth: "max-content" }}>
          <TypeIconMap type={type} />
        </Button>
        <Typography>{`Issue-${taskId}`}</Typography>
      </Box>
    </Link>,
  ];
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"flex-start"}
    >
      <ProjectBreadcrumbs breadcrumbs={breadcrumbs} />
      <IconButton onClick={() => navigate(-1)}>
        <ClearOutlined />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          "aria-labelledby": "status-button",
        }}
      >
        {types.map((t: dropdownDataProps) => (
          <MenuItem key={t.value} value={t.value}>
            <DropdownLabel
              Icon={TypeIconMap[t.value as keyof typeof TypeIconMap]}
              label={t.label}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default TaskBreadCrumps;
