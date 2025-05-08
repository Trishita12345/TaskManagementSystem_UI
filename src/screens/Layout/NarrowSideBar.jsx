import Hamburger from "./Hamburger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import ThemeToggleSwitch from "../../components/ThemeToggleSwich";
import Avatar from "../../components/Avatar";

const NarrowSideBar = ({ setIsSidebarOpen }) => {
  return (
    <div id="narrow-sidebar">
      <Hamburger setIsSidebarOpen={setIsSidebarOpen} />
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
            onClick={(e) => {}}
            icon={faCube}
            size="xl"
            style={{ cursor: "pointer", paddingLeft: "12px" }}
          />
          <ThemeToggleSwitch />
        </div>
        <div>
          <div style={{ paddingLeft: "8px", margin: "20px 0px" }}>
            <Avatar text="T" onClick={() => {}} />
          </div>
          <FontAwesomeIcon
            onClick={(e) => {}}
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
