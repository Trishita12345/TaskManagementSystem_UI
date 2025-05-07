import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Hamburger = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      id="hamburger"
      className={isSidebarOpen ? "hamburger-left" : "hamburger-right"}
      onClick={() => setIsSidebarOpen((prev) => !prev)}
    >
      <div id="hamburger-icon">
        <FontAwesomeIcon
          icon={isSidebarOpen ? faChevronLeft : faChevronRight}
        />
      </div>
    </div>
  );
};

export default Hamburger;
