import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { blueGrey } from "@mui/material/colors";

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
