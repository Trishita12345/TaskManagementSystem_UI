import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getTheme } from "../../utils/redux/slices/commonSlice";
import { useSelector } from "react-redux";

type propType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: any;
};
const Hamburger = ({ isSidebarOpen, setIsSidebarOpen }: propType) => {
  const theme = useSelector(getTheme);
  return (
    <div
      id="hamburger"
      style={{
        backgroundColor: theme.secondaryColor2,
        border: `1px solid ${theme.secondaryColor3}`,
      }}
      className={isSidebarOpen ? "hamburger-left" : "hamburger-right"}
      onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}
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
