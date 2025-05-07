import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NarrowSideBarItem = ({ item }) => {
  //TODO: if priviledge exists in token
  return (
    <div id="narrow-sidebar-item" className="right-tooltip">
      <FontAwesomeIcon
        onClick={(e) => {}}
        icon={item.icon}
        size="lg"
        style={{ cursor: "pointer", padding: "4px" }}
      />
      <span class="right-tooltiptext">{item.name}</span>
    </div>
  );
};

export default NarrowSideBarItem;
