import { MenuItem, Button, ListItemText, Menu } from "@mui/material";
import type {
  dropdownDataProps,
  UpdateableTaskComponentProps,
} from "../../../../constants/types";
import { useSelector } from "react-redux";
import { statuses } from "../../../../utils/redux/slices/taskSlice";
import { useState } from "react";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

const TaskStatus = ({
  selectedTask,
  updateTask,
}: UpdateableTaskComponentProps) => {
  const { status } = selectedTask;
  const statusList = useSelector(statuses);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value?: string) => {
    setAnchorEl(null);
    if (value) {
      updateTask("status", value);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<ArrowDropDownOutlinedIcon />}
        sx={{
          textTransform: "none",
          // backgroundColor: theme.secondaryColor3,
          // color: theme.secondaryContrast,
          fontWeight: "bold",
          "&:hover": {
            // backgroundColor: theme.secondaryColor3,
          },
          borderRadius: 0,
        }}
      >
        {statusList.find((s: dropdownDataProps) => s.value === status)?.label}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          "aria-labelledby": "status-button",
        }}
      >
        {statusList.map((s: dropdownDataProps) => (
          <MenuItem key={s.value} onClick={() => handleClose(s.value)}>
            <ListItemText>{s.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default TaskStatus;
