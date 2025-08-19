import { Person } from "@mui/icons-material";
import { Modal, Tooltip, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { blueGrey } from "@mui/material/colors";
import { useState } from "react";

interface CustomAvatarTypes {
  text?: string;
  avatarImage?: string;
  onClick?: any;
  sx?: any;
  height?: number;
  width?: number;
  bgColor?: string;
  tooltipText?: string;
}
const CustomAvatar = ({
  text,
  avatarImage,
  onClick,
  sx,
  height,
  width,
  bgColor,
  tooltipText,
}: CustomAvatarTypes) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      {avatarImage ? (
        <Tooltip title={tooltipText} arrow>
          <Avatar
            alt="Remy Sharp"
            src={avatarImage}
            sx={{
              ...sx,
              width: width || 35,
              height: height || 35,
              cursor: "pointer",
            }}
            onClick={() => {
              if (onClick) onClick();
              else setOpen(true);
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip title={tooltipText} arrow>
          <Avatar
            sx={{
              ...sx,
              bgcolor: bgColor || blueGrey[300],
              color: "white",
              height: width || 35,
              width: height || 35,
            }}
            onClick={onClick}
          >
            {text ? (
              <Typography fontWeight={600}>{text}</Typography>
            ) : (
              <Person />
            )}
          </Avatar>
        </Tooltip>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Avatar
          alt="Remy Sharp"
          src={avatarImage}
          sx={{
            width: "40vw",
            height: "40vw",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Modal>
    </>
  );
};

export default CustomAvatar;
