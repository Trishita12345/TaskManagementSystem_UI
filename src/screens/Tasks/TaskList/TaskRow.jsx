import { openPopup } from "../../../components/Popup.jsx";
import GetStatus from "./GetStatus.jsx";

const TaskRow = ({
  id,
  title,
  description,
  dueDate,
  status,
  setSelectedIdForEdit,
  setSelectedIdForDelete,
  updateStatus,
}) => {
  const handleEdit = () => {
    setSelectedIdForEdit(id);
    openPopup();
  };

  const handleDelete = () => {
    setSelectedIdForDelete(id);
    openPopup();
  };

  return (
    <tr key={id}>
      <td>{title}</td>
      <td>{description || "-"}</td>
      <td>{dueDate}</td>
      <td>
        <GetStatus id={id} statusId={status} updateStatus={updateStatus} />
      </td>
      <td>
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
