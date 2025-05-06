import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import "./loader.css";

const Loader = () => {
  return (
    <div id="loader-overlay">
      <div id="loader">
        <FontAwesomeIcon flip icon={faCube} style={{ fontSize: "70px" }} />
      </div>
    </div>
  );
};

export default Loader;
