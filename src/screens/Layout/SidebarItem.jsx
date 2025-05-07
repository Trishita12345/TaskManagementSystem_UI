import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBarItem = ({ item }) => {
  //TODO: if priviledge exists in token
  return (
    <div id="sidebar-item">
      <div id="sidebar-text">
        <FontAwesomeIcon
          onClick={(e) => {}}
          icon={item.icon}
          size="lg"
          style={{ cursor: "pointer", padding: "4px" }}
        />
        {item.name}
      </div>
    </div>
  );
};

export default SideBarItem;
