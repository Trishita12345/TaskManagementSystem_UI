import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const SideBarItem = ({ item }) => {
  let location = useLocation();
  const theme = useSelector(getTheme);
  const userPriviledges = useSelector(
    (state) => state.authenticationSlice.userPriviledges
  );
  const sx =
    location.pathname === item.route
      ? {
          backgroundColor: theme.secondaryColor3,
        }
      : {};
  return (
    <>
      {userPriviledges.includes(item.priviledge) ? (
        <Box id="sidebar-item" sx={sx}>
          <div
            id="sidebar-text"
            style={{
              color: theme.secondaryContrast,
            }}
          >
            <FontAwesomeIcon
              onClick={(e) => {}}
              icon={item.icon}
              size="lg"
              style={{ cursor: "pointer", padding: "4px" }}
            />
            {item.name}
          </div>
        </Box>
      ) : null}
    </>
  );
};

export default SideBarItem;
