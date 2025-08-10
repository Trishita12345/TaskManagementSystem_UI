import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import strings from "../../constants/strings";

const Logo = ({ color }: { color?: string }) => {
  return (
    <div id="logo" style={{ color: color || "black" }}>
      <FontAwesomeIcon icon={faCube} size="lg" className="icon" />
      <div id="logoText" style={{ fontWeight: 400 }}>
        {strings.logoText}
      </div>
    </div>
  );
};

export default Logo;
