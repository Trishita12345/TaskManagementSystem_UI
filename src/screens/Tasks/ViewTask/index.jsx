import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import strings from "../../../constants/strings";
import {
  setSelectedIdForEdit,
  setSelectedIdForView,
} from "../../../utils/redux/slices/taskSlice";
import { openPopup } from "../../../components/Popup/index.jsx";
import "./viewTask.css";
import Chip from "../../../components/Chip/index.jsx";
import { getStatusColor } from "../../../utils/helperFunctions.js";

const ViewTask = ({ onPopupClose }) => {
  const dispatch = useDispatch();
  const statusList = useSelector((state) => state.taskSlice.statusList);
  const data = useSelector((state) => state.taskSlice.taskById);
  const selectedIdForView = useSelector(
    (state) => state.taskSlice.selectedIdForView
  );
  const employeeList = useSelector((state) => state.taskSlice.employeeList);

  const handleEdit = () => {
    //TODO: Need to check if the user is premium
    //If premium
    dispatch(setSelectedIdForView(null));
    dispatch(setSelectedIdForEdit(selectedIdForView));
    openPopup();
    //Else navigate to buy premium
  };
  return (
    <div style={{ margin: "0px 10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="header">{data.id}</p>
        <FontAwesomeIcon
          onClick={(e) => onPopupClose()}
          icon={faXmark}
          size="lg"
          style={{ cursor: "pointer", padding: "4px" }}
        />
      </div>
      <hr />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div>
          <p className="label">{`${strings.title}:`}</p>
          <p>{data.title}</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <p className="label">{`${strings.description}:`}</p>
          <p>{data.description}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <p className="label">{`${strings.assignedTo}:`}</p>
          <p>{employeeList.find((e) => e.id === data.assignedTo)?.emailId}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <p className="label">{`${strings.dueDate}:`}</p>
          <p>{data.dueDate}</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <p className="label">{`${strings.status}:`}</p>
          <Chip
            text={statusList.find((s) => s.id === data.status)?.name}
            color={getStatusColor(data.status)}
          />
        </div>
        <button onClick={handleEdit} style={{ marginTop: "10px" }}>
          {strings.editTask}
        </button>
      </div>
    </div>
  );
};

export default ViewTask;
