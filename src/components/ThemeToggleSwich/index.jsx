import { useState, useEffect } from "react";
import "./ThemeToggleSwitch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsDark } from "../../utils/redux/slices/commonSlice";

const ThemeToggleSwitch = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.commonStore.isDark);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  return (
    <div
      className="toggle-container"
      onClick={() => dispatch(setIsDark(!isDark))}
    >
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
