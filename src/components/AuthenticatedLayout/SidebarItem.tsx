import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import {
  selectedProjectDetails,
  userDetails,
} from "../../utils/redux/slices/authenticationSlice";
import { routes } from "../../constants/routes";
import { useEffect, useState } from "react";

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
  const selectedProject = useSelector(selectedProjectDetails);
  let location = useLocation();
  let navigate = useNavigate();
  const theme = useSelector(getTheme);
  const { permissions } = useSelector(userDetails);
  const [route, setRoute] = useState<string>("");

  useEffect(() => {
    if (item.route === routes.viewEditProject) {
      setRoute(`${routes.viewEditProject}/${selectedProject?.projectId}`);
    } else {
      setRoute(item.route);
    }
  }, [item, selectedProject]);
  const sx =
    location.pathname === route
      ? {
          backgroundColor: theme.secondaryColor3,
        }
      : {};
  return (
    <>
      {permissions.includes(item.priviledge) ? (
        <Box
          id="sidebar-item"
          sx={sx}
          onClick={() => {
            navigate(route);
          }}
        >
          <div
            id="sidebar-text"
            style={{
              color: theme.secondaryContrast,
            }}
          >
            <FontAwesomeIcon
              icon={item.icon}
              size="lg"
              style={{
                cursor: "pointer",
                paddingLeft: "12px",
                paddingRight: "4px",
              }}
            />
            {item.name}
          </div>
        </Box>
      ) : null}
    </>
  );
};

export default SideBarItem;
