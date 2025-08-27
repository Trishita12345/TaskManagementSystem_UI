import {
  KeyboardArrowRightSharp,
  KeyboardArrowDownSharp,
} from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

interface collapseHeading {
  collapsed: boolean;
  setCollapsed: any;
  headingText?: string;
}
const CollapseHeading = ({
  collapsed,
  setCollapsed,
  headingText,
}: collapseHeading) => {
  return (
    <Box
      display="flex"
      alignItems={"center"}
      gap={1}
      onClick={() => setCollapsed((prev: boolean) => !prev)}
      sx={{ cursor: "pointer" }}
    >
      <Tooltip title={collapsed ? "Expand" : "Collapse"}>
        <IconButton sx={{ borderRadius: 0, p: 0 }}>
          {collapsed ? (
            <KeyboardArrowRightSharp fontSize="small" />
          ) : (
            <KeyboardArrowDownSharp fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
      <Typography
        variant="subtitle1"
        textTransform={"capitalize"}
        fontWeight={600}
      >
        {headingText || ""}
      </Typography>
    </Box>
  );
};

export default CollapseHeading;
