import { useDispatch, useSelector } from "react-redux";
import { getNameInitials } from "../../utils/helperFunctions/commonHelperFunctions";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import {
  setIsAuthenticated,
  userDetails,
} from "../../utils/redux/slices/authenticationSlice";
import ThemeToggleSwitch from "../../components/ThemeToggleSwich";
import CustomAvatar from "../../components/CustomAvatar";
import { logoutUser } from "../../utils/helperFunctions/authHelperFunctions";
import LogoIcon from "../../components/Logo/LogoIcon";
import { Box } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const NarrowSideBar = () => {
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        <Box
          id={"logo"}
          pl={1.2}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(routes.projectList)}
        >
          <LogoIcon color={"white"} size={"25px"} />
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
            // onClick={() => {}}
          />
          <ThemeToggleSwitch />
          <Logout onClick={handleLogout} />
        </Box>
      </Box>
    </Box>
  );
};

export default NarrowSideBar;
