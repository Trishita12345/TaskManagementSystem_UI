import { Snackbar } from "@mui/material";
import MuiAlert, { type AlertProps } from "@mui/material/Alert";
import type { FC, SyntheticEvent } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationMessage,
  setMessage,
} from "../../utils/redux/slices/commonSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

const Notification: FC = () => {
  const dispatch = useDispatch();
  const message = useSelector(notificationMessage);

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setMessage({ ...message, display: false }));
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={message.display}
      autoHideDuration={message.duration || 2000}
      onClose={handleClose}
      onClick={handleClose}
      sx={{ whiteSpace: "break-spaces" }}
    >
      <Alert
        onClose={handleClose}
        severity={message.severity}
        sx={{ width: "100%" }}
      >
        {message.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
