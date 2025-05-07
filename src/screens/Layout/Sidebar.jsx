import Hamburger from "./Hamburger";
import SideBarItem from "./SidebarItem";
import { sidebarItemsList } from "../../constants/sidebarItemsList";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  if (!isSidebarOpen) return null;
  return (
    <div id="sidebar">
      <Hamburger
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {sidebarItemsList.map((s) => (
        <SideBarItem key={s.id} item={s} />
      ))}
    </div>
  );
};

export default Sidebar;
