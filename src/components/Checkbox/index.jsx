import "./Checkbox.css";

const Checkbox = ({ label, handleCheckboxChange, isChecked }) => {
  return (
    <div className="checkbox-wrapper">
      <div>
        <input
          style={{ cursor: "pointer" }}
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      <div>{label}</div>
    </div>
  );
};

export default Checkbox;
