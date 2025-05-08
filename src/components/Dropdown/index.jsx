import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./dropdown.css";

const Dropdown = ({ dropdownData, selectedValue, handleChange }) => {
  return (
    <div className="dropdown-wrapper">
      <div className="dropdown-container">
        <select
          value={selectedValue}
          onChange={(e) => handleChange(e.target.value)}
          className="dropdown-select"
        >
          {dropdownData.map((d) => (
            <option value={d.id}>{d.name}</option>
          ))}
        </select>
        <FontAwesomeIcon
          icon={faCaretDown}
          size="sm"
          className="dropdown-icon"
        />
      </div>
    </div>
  );
};

export default Dropdown;
