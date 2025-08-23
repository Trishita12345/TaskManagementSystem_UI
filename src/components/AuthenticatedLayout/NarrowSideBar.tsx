import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import {
  setIsAuthenticated,
  userDetails,
} from "../../utils/redux/slices/authenticationSlice";
import ThemeToggleSwitch from "../ThemeToggleSwich";
import CustomEmployeeAvatar from "../CustomEmployeeAvatar";
import { logoutUser } from "../../utils/helperFunctions/authHelperFunctions";
import LogoIcon from "../Logo/LogoIcon";
import { Box } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { setClearFilter } from "../../utils/redux/slices/taskSlice";

const NarrowSideBar = () => {
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();
  const { permissions, ...empDetails } = useSelector(userDetails);
  const handleLogout = () => {
    logoutUser();
    dispatch(setIsAuthenticated());
    dispatch(setClearFilter());
  };
  return (
    <Box bgcolor={theme.primary} id="narrow-sidebar">
      <Box
        sx={{
          height: "100%",
          paddingY: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box pl={1.2} mb={2} sx={{ cursor: "pointer" }}>
          <Box mb={2}>
            <LogoIcon color={"white"} size={"25px"} />
          </Box>
        </Box>
        <Box
          sx={{ cursor: "pointer" }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
        >
          <CustomEmployeeAvatar
            employeeDetails={empDetails}
            onTooltipClick={() => {}}
          />
          <ThemeToggleSwitch />
          <Logout onClick={handleLogout} />
        </Box>
      </Box>
    </Box>
  );
};

export default NarrowSideBar;
