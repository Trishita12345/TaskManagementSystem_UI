import Hamburger from "./Hamburger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getNameInitials } from "../../utils/helperFunctions";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import {
  setIsAuthenticated,
  userDetails,
} from "../../utils/redux/slices/authenticationSlice";
import ThemeToggleSwitch from "../../components/ThemeToggleSwich";
import CustomAvatar from "../../components/CustomAvatar";
import { logoutUser } from "../../utils/authHelperFunctions";

type propType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: any;
};
const NarrowSideBar = ({ isSidebarOpen, setIsSidebarOpen }: propType) => {
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();
  const { firstname, lastname, profileImage } = useSelector(userDetails);
  const handleLogout = () => {
    logoutUser();
    dispatch(setIsAuthenticated());
  };
  return (
    <div
      id="narrow-sidebar"
      style={{
        backgroundColor: theme.primary,
      }}
    >
      <Hamburger
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div style={{ marginBottom: "20px" }}></div>
      <div
        style={{
          height: "95%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <FontAwesomeIcon
            icon={faCube}
            size="xl"
            style={{ cursor: "pointer", paddingLeft: "12px" }}
          />
          <ThemeToggleSwitch />
        </div>
        <div>
          <div style={{ margin: "20px 5px" }}>
            <CustomAvatar
              text={getNameInitials(firstname, lastname)}
              avatarImage={profileImage}
              onClick={() => {}}
            />
          </div>
          <FontAwesomeIcon
            onClick={handleLogout}
            icon={faArrowRightFromBracket}
            size="xl"
            style={{ cursor: "pointer", paddingLeft: "12px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default NarrowSideBar;
