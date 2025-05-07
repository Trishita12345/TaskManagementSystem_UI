import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

const Logo = () => {
  return (
    <div id="logo">
      <FontAwesomeIcon icon={faCube} size="lg" className="icon" />
      <div id="logoText" style={{ fontWeight: 400 }}>
        manageMyTask.com
      </div>
    </div>
  );
};

export default Logo;
