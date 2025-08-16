import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  getTheme,
  setIsSidebarOpen,
  sidebarOpen,
} from "../../utils/redux/slices/commonSlice";
import { useDispatch, useSelector } from "react-redux";

const Hamburger = ({ disabled }: { disabled?: boolean }) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(sidebarOpen);
  const theme = useSelector(getTheme);
  return (
    <div
      id="hamburger"
      style={{
        backgroundColor: theme.secondaryColor2,
        border: `1px solid ${theme.secondaryColor3}`,
        cursor: disabled ? "default" : "pointer",
      }}
      className={isSidebarOpen ? "hamburger-left" : "hamburger-right"}
      onClick={() => {
        if (!disabled) dispatch(setIsSidebarOpen(!isSidebarOpen));
      }}
    >
      <div id="hamburger-icon">
        <FontAwesomeIcon
          color={theme.primary}
          size="xs"
          icon={isSidebarOpen ? faChevronLeft : faChevronRight}
        />
      </div>
    </div>
  );
};

export default Hamburger;
