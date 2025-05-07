import { useState, useEffect } from "react";
import "./ThemeToggleSwitch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeToggleSwitch = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  return (
    <div className="toggle-container" onClick={() => setIsDark(!isDark)}>
      <div className={`toggle-switch ${isDark ? "dark" : "light"}`}>
        <span className="icon sun">
          <FontAwesomeIcon icon={faSun} />
        </span>
        <span className="icon moon">
          <FontAwesomeIcon icon={faMoon} />
        </span>
        <div className="slider"></div>
      </div>
    </div>
  );
};

export default ThemeToggleSwitch;
