import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { blueGrey } from "@mui/material/colors";

interface CustomAvatarTypes {
  text: string;
  avatarImage?: string;
  onClick?: (e: any) => void;
  className?: string;
  style?: any;
  id?: string;
}
const CustomAvatar = ({
  text,
  avatarImage,
  onClick = () => {},
  className = "",
  style,
  id = "",
}: CustomAvatarTypes) => {
  return (
    <div id={id} onClick={onClick} className={className} style={style}>
      {avatarImage ? (
        <Avatar alt="" src={avatarImage} />
      ) : (
        <Avatar
          sx={{
            bgcolor: blueGrey[300],
            color: "white",
            height: "35px",
            width: "35px",
          }}
        >
          <Typography fontWeight={600}>{text}</Typography>
        </Avatar>
      )}
    </div>
  );
};

export default CustomAvatar;
