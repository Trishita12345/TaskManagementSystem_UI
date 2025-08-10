import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const CustomAvatar = ({
  text,
  avatarImage = null,
  onClick = () => {},
  className = "",
  style,
}: any) => {
  return (
    <div onClick={onClick} className={className} style={style}>
      {avatarImage ? (
        <Avatar alt="" src={avatarImage} />
      ) : (
        <Avatar sx={{ bgcolor: deepOrange[500], color: "white" }}>
          {text}
        </Avatar>
      )}
    </div>
  );
};

export default CustomAvatar;
