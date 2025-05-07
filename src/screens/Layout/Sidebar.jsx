import { useEffect } from "react";
import useScreenSize from "../../utils/customHooks/useScreenSize";
import Hamburger from "./Hamburger";
import { smallDevice } from "../../constants/data";
import SideBarItem from "./SidebarItem";
import { sidebarItemsList } from "../../constants/sidebarItemsList";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { width } = useScreenSize();
  console.log(width);
  const openSidebar = () => {
    document.getElementById("sidebar").style.display = "flex";
    if (width <= smallDevice)
      document.getElementById("sidebar-overlay").style.display = "flex";
  };

  const closeSidebar = () => {
    document.getElementById("sidebar").style.display = "none";
    if (width <= smallDevice)
      document.getElementById("sidebar-overlay").style.display = "none";
  };

  useEffect(() => {
    if (isSidebarOpen) openSidebar();
    else closeSidebar();
  }, [isSidebarOpen]);

  return (
    <>
      {width <= smallDevice ? (
        <div id={"sidebar-overlay"}>
          <div id="sidebar">
            <Hamburger setIsSidebarOpen={setIsSidebarOpen} />
            {sidebarItemsList.map((s) => (
              <SideBarItem key={s.id} item={s} />
            ))}
          </div>
        </div>
      ) : (
        <div id="sidebar">
          <div style={{ padding: "10px 0px", height: "40px" }}>
            <Hamburger setIsSidebarOpen={setIsSidebarOpen} />
            {sidebarItemsList.map((s) => (
              <SideBarItem key={s.id} item={s} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
