import strings from "../../../constants/strings";
import "./taskButtonGroup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faFilter } from "@fortawesome/free-solid-svg-icons";

const TaskButtonGroup = ({ onFilter, onAdd }) => {
  return (
    <div className="button-group">
      <button onClick={onFilter}>
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <FontAwesomeIcon
            icon={faFilter}
            style={{ cursor: "pointer", padding: "4px" }}
          />
          {strings.filter}
        </div>
      </button>
      <button onClick={onAdd}>
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <FontAwesomeIcon
            onClick={(e) => onPopupClose()}
            icon={faAdd}
            size="lg"
            style={{ cursor: "pointer", padding: "4px" }}
          />
          {strings.newTask}
        </div>
      </button>
    </div>
  );
};

export default TaskButtonGroup;
