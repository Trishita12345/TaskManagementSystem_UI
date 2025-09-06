import { Box, Typography } from "@mui/material";
import {
  BookmarkBorderOutlined,
  CheckBox,
  DragHandle,
  KeyboardArrowDown,
  KeyboardArrowUp,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug, faMinusSquare } from "@fortawesome/free-solid-svg-icons";

export const DropdownLabel = ({
  Icon,
  label,
}: {
  Icon: React.ReactNode;
  label: string;
}) => {
  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      {Icon}
      <Typography>{label}</Typography>
    </Box>
  );
};
export const PriorityIconMap = ({ priority }: { priority: string }) => {
  switch (priority) {
    case "P0":
      return <KeyboardDoubleArrowUp color="error" />;
    case "P1":
      return <KeyboardArrowUp color="error" />;
    case "P2":
      return <DragHandle color="warning" />;
    case "P3":
      return <KeyboardArrowDown color="primary" />;
  }
};

export const TypeIconMap = ({ type }: { type: string }) => {
  switch (type) {
    case "STORY":
      return <BookmarkBorderOutlined color="success" fontSize="small" />;
    case "TASK":
      return <CheckBox color="primary" fontSize="small" />;
    case "BUG":
      return <FontAwesomeIcon icon={faBug} height={"1rem"} color="red" />;
    case "ENHANCEMENT":
      return (
        <FontAwesomeIcon
          icon={faMinusSquare}
          height={"1.3rem"}
          color="darkgray"
        />
      );
  }
};
