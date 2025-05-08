import { useDispatch, useSelector } from "react-redux";
import GetStatus from "./GetStatus.jsx";
import {
  setSelectedIdForDelete,
  setSelectedIdForView,
} from "../../../utils/redux/slices/taskSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { openPopup } from "../../../components/Popup/index.jsx";

const TaskRow = ({ id, title, assignedTo, status, updateStatus }) => {
  const dispatch = useDispatch();

  const employeeList = useSelector((state) => state.taskSlice.employeeList);

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
          className="link"
          style={{ textDecoration: "underline" }}
        >
          {id}
        </div>
      </td>
      <td>{title}</td>
      <td>{employeeList.find((e) => e.id === assignedTo)?.name}</td>
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
