import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const SideBarItem = ({ item }) => {
  const userPriviledges = useSelector(
    (state) => state.authenticationSlice.userPriviledges
  );
  return (
    <>
      {userPriviledges.includes(item.priviledge) ? (
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
      ) : null}
    </>
  );
};

export default SideBarItem;
