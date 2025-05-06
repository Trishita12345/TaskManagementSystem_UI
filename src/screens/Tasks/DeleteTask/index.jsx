import { closePopup } from "../../../components/Popup.jsx";

const DeleteTask = ({ deleteTaskById }) => {
  return (
    <>
      <div style={{ textAlign: "center", padding: "12px" }}>
        <p style={{ fontWeight: 600, fontSize: "24px", margin: "8px" }}>
          Delete Task ?
        </p>
        <p style={{ marginBottom: "10px" }}>
          Are you sure you want to delete this task? <br />
          This action cannot be undone.
        </p>
        <div id="formBtnContainer">
          <button onClick={deleteTaskById}>Confirm</button>
          <button onClick={closePopup}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default DeleteTask;
