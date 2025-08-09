import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";

const CustomAvatar = ({
  text,
  avatarImage = null,
  onClick = () => {},
  className = "",
  style,
}) => {
  return (
    <div onClick={onClick} className={className} style={style}>
      {avatarImage ? (
        <Avatar alt="" src={avatarImage} />
      ) : (
        <Avatar sx={{ bgcolor: deepPurple[500] }}>{text}</Avatar>
      )}
    </div>
  );
};

export default CustomAvatar;
