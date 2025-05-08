import Hamburger from "./Hamburger";
import SideBarItem from "./SidebarItem";
import { sidebarItemsList } from "../../constants/sidebarItemsList";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  if (!isSidebarOpen)
    return (
      <div id="sidebar-closed">
        <Hamburger
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    );
  return (
    <div id="sidebar">
      <Hamburger
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div style={{ marginBottom: "8px" }}></div>
      {sidebarItemsList.map((s) => (
        <SideBarItem key={s.id} item={s} />
      ))}
    </div>
  );
};

export default Sidebar;
