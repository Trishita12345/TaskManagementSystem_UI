import { useDispatch } from "react-redux";
import GetStatus from "./GetStatus.jsx";
import {
  setSelectedIdForDelete,
  setSelectedIdForView,
} from "../../../utils/redux/slices/taskSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { openPopup } from "../../../components/Popup/index.jsx";

const TaskRow = ({ id, title, dueDate, status, updateStatus }) => {
  const dispatch = useDispatch();

  const handleView = () => {
    dispatch(setSelectedIdForView(id));
    openPopup();
  };

  const handleDelete = () => {
    dispatch(setSelectedIdForDelete(id));
    openPopup();
  };

  return (
    <tr key={id}>
      <td>
        <div
          onClick={handleView}
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            width: "max-content",
          }}
        >
          {title}
        </div>
      </td>
      <td>{dueDate}</td>
      <td>
        <GetStatus id={id} statusId={status} updateStatus={updateStatus} />
      </td>
      <td>
        <div>
          <FontAwesomeIcon
            onClick={handleDelete}
            icon={faTrash}
            size="lg"
            style={{ cursor: "pointer" }}
          />
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
