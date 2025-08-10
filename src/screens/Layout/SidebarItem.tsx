import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { userDetails } from "../../utils/redux/slices/authenticationSlice";

type propType = {
  item: {
    id: number;
    name: string;
    icon: any;
    route: string;
    priviledge: string;
  };
};

const SideBarItem = ({ item }: propType) => {
  let location = useLocation();
  const theme = useSelector(getTheme);
  const { permissions } = useSelector(userDetails);
  const sx =
    location.pathname === item.route
      ? {
          backgroundColor: theme.secondaryColor3,
        }
      : {};
  return (
    <>
      {permissions.includes(item.priviledge) ? (
        <Box id="sidebar-item" sx={sx}>
          <div
            id="sidebar-text"
            style={{
              color: theme.secondaryContrast,
            }}
          >
            <FontAwesomeIcon
              onClick={() => {}}
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
