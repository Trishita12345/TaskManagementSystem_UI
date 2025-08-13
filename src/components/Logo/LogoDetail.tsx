import strings from "../../constants/strings";
import LogoIcon from "./LogoIcon";

const Logo = ({ color }: { color?: string }) => {
  return (
    <div id="logo" style={{ color: color || "black" }}>
      <LogoIcon color={color} size={"25px"} />
      <div id="logoText" style={{ fontWeight: 400 }}>
        {strings.logoText}
      </div>
    </div>
  );
};

export default Logo;
