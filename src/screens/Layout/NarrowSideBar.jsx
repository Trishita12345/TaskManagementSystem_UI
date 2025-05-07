import { sidebarItemsList } from "../../constants/sidebarItemsList";
import NarrowSideBarItem from "./NarrowSideBarItem";

const NarrowSideBar = () => {
  return (
    <div id="narrow-sidebar">
      <div style={{ padding: "10px 0px", height: "40px" }}>
        {sidebarItemsList.map((s) => (
          <NarrowSideBarItem key={s.id} item={s} />
        ))}
      </div>
    </div>
  );
};

export default NarrowSideBar;
