import strings from "../../../constants/strings";

const DeleteTask = ({ deleteTaskById, onPopupClose }) => {
  return (
    <>
      <div style={{ textAlign: "center", padding: "12px" }}>
        <p style={{ fontWeight: 600, fontSize: "28px", margin: "8px" }}>
          {strings.deleteTaskHeader}
        </p>
        <p style={{ marginBottom: "20px" }}>
          {strings.deleteTaskSubHeading1} <br />
          {strings.deleteTaskSubHeading2}
        </p>
        <div id="formBtnContainer">
          <button onClick={deleteTaskById}>{strings.confirmText}</button>
          <button onClick={(e) => onPopupClose()}>{strings.cancelText}</button>
        </div>
      </div>
    </>
  );
};

export default DeleteTask;
