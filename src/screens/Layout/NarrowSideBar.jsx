import { sidebarItemsList } from "../../constants/sidebarItemsList";
import Hamburger from "./Hamburger";
import NarrowSideBarItem from "./NarrowSideBarItem";

const NarrowSideBar = ({ setIsSidebarOpen }) => {
  return (
    <div id="narrow-sidebar">
      <Hamburger setIsSidebarOpen={setIsSidebarOpen} />
      <div style={{ marginBottom: "8px" }}></div>
      {sidebarItemsList.map((s) => (
        <NarrowSideBarItem key={s.id} item={s} />
      ))}
    </div>
  );
};

export default NarrowSideBar;
