import "./Checkbox.css";

const Checkbox = ({
  label,
  handleCheckboxChange,
  isChecked,
  style = {},
  className = "",
}: any) => {
  return (
    <div className={`checkbox-wrapper ${className}`} style={style}>
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
