import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCube } from "@fortawesome/free-solid-svg-icons";
import { openSidebar } from "./Sidebar";

const Logo = ({ onHamburgerClick }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        padding: "10px 6px",
        height: "40px",
      }}
    >
      <div id="hamburger">
        <FontAwesomeIcon
          onClick={onHamburgerClick}
          icon={faBars}
          size="lg"
          className="icon"
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 2,
          cursor: "pointer",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon
          onClick={(e) => onPopupClose()}
          icon={faCube}
          size="lg"
          className="icon"
        />
        <div id="logoText" style={{ fontWeight: 400 }}>
          manageMyTask.com
        </div>
      </div>
    </div>
  );
};

export default Logo;
