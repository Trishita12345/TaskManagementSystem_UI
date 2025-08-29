import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import "./loader.css";
import { useSelector } from "react-redux";
import { getTheme } from "../../utils/redux/slices/commonSlice";

const Loader = () => {
  const theme = useSelector(getTheme);
  return (
    <div id="loader-overlay">
      <div id="loader">
        <FontAwesomeIcon
          fade
          icon={faEllipsis}
          style={{ fontSize: "70px" }}
          color={theme.primary}
        />
      </div>
    </div>
  );
};

export default Loader;
