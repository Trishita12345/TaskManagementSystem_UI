import strings from "../../../constants/strings";
import "./taskButtonGroup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCircle, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const TaskButtonGroup = ({ onFilter, onAdd }) => {
  const taskFilterObj = useSelector((state) => state.taskSlice.taskFilterObj);
  return (
    <div className="button-group">
      <button onClick={onFilter} style={{ position: "relative" }}>
        {Object.keys(taskFilterObj).length > 0 && (
          <FontAwesomeIcon
            icon={faCircle}
            color="red"
            style={{
              fontSize: "12px",
              position: "absolute",
              top: -4,
              left: -4,
            }}
          />
        )}
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
