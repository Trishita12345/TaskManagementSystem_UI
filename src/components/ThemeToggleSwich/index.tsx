import "./ThemeToggleSwitch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { isDark, setIsDark } from "../../utils/redux/slices/commonSlice";

const ThemeToggleSwitch = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(isDark);

  return (
    <div
      className="toggle-container"
      onClick={() => dispatch(setIsDark(!isDark))}
    >
      <div className={`toggle-switch ${isDarkMode ? "dark" : "light"}`}>
        <span className="icon sun">
          <FontAwesomeIcon icon={faSun} size="2xs" />
        </span>
        <span className="icon moon">
          <FontAwesomeIcon icon={faMoon} size="2xs" />
        </span>
        <div className="slider"></div>
      </div>
    </div>
  );
};

export default ThemeToggleSwitch;
