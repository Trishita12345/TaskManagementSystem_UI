import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Hamburger = ({ setIsSidebarOpen }) => {
  return (
    <div id="hamburger" onClick={() => setIsSidebarOpen((prev) => !prev)}>
      <div id="hamburger-icon">
        <FontAwesomeIcon icon={faBars} size="lg" />
      </div>
    </div>
  );
};

export default Hamburger;
