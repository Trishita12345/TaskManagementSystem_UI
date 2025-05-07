import { sidebarItemsList } from "../../constants/sidebarItemsList";

const NarrowSideBar = () => {
  return (
    <div id="narrow-sidebar">
      <div style={{ padding: "10px 0px", height: "40px" }}>
        {sidebarItemsList.map((s) => (
          //   <SideBarItem key={s.id} item={s} />
          <div>hi</div>
        ))}
      </div>
    </div>
  );
};

export default NarrowSideBar;
