import useScreenSize from "../../utils/customHooks/useScreenSize";
import Logo from "./Logo";

export const openSidebar = () => {
  document.getElementById("sidebar").style.display = "flex";
  document.getElementById("sidebar-overlay").style.display = "flex";
};

export const closeSidebar = () => {
  document.getElementById("sidebar").style.display = "none";
  document.getElementById("sidebar-overlay").style.display = "none";
};

const Sidebar = () => {
  const { width, height } = useScreenSize();
  return (
    <div id="sidebar-overlay">
      <div id="sidebar">
        <Logo onHamburgerClick={closeSidebar} />
      </div>
    </div>
  );
};

export default Sidebar;
