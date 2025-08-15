import { useDispatch, useSelector } from "react-redux";
import { getNameInitials } from "../../utils/helperFunctions/commonHelperFunctions";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import {
  setIsAuthenticated,
  userDetails,
} from "../../utils/redux/slices/authenticationSlice";
import ThemeToggleSwitch from "../ThemeToggleSwich";
import CustomAvatar from "../CustomAvatar";
import { logoutUser } from "../../utils/helperFunctions/authHelperFunctions";
import LogoIcon from "../Logo/LogoIcon";
import { Box } from "@mui/material";
import { Logout } from "@mui/icons-material";

const NarrowSideBar = () => {
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();
  const { firstname, lastname, profileImage } = useSelector(userDetails);
  const handleLogout = () => {
    logoutUser();
    dispatch(setIsAuthenticated());
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
          <CustomAvatar
            text={getNameInitials(firstname, lastname)}
            avatarImage={profileImage}
            onClick={() => {}}
          />
          <ThemeToggleSwitch />
          <Logout onClick={handleLogout} />
        </Box>
      </Box>
    </Box>
  );
};

export default NarrowSideBar;
