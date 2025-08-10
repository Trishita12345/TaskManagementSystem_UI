import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import strings from "../../../../constants/strings";

const AddTaskButton = ({ onAdd }) => {
  return (
    <button onClick={onAdd}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <FontAwesomeIcon icon={faAdd} style={{ cursor: "pointer" }} />
        {strings.newTask}
      </div>
    </button>
  );
};

export default AddTaskButton;
