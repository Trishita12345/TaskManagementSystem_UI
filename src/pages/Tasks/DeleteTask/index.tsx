import { Delete, WarningAmber } from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import useScreenSize from "../../../utils/customHooks/useScreenSize";
import { useDispatch, useSelector } from "react-redux";
import {
  getTheme,
  setIsLoading,
  setMessage,
} from "../../../utils/redux/slices/commonSlice";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../../constants/routes";
import type { AxiosError } from "axios";
import { getErrorMessage } from "../../../utils/helperFunctions/commonHelperFunctions";
import { deleteTaskById } from "../../../utils/services/taskService";
import { selectedProjectDetails } from "../../../utils/redux/slices/authenticationSlice";

const DeleteTask = () => {
  const theme = useSelector(getTheme);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { projectId } = useSelector(selectedProjectDetails);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onConfirm = async () => {
    if (!id) return;
    try {
      dispatch(setIsLoading(true));
      await deleteTaskById(projectId, id);
      setIsLoading(false);
      setTimeout(() => {
        navigate(routes.myBoard);
        dispatch(
          setMessage({
            display: true,
            severity: "success",
            message: "Task deleted successfully!",
          })
        );
      }, 1000);
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      dispatch(
        setMessage({
          display: true,
          severity: "error",
          message: getErrorMessage(err),
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const { width } = useScreenSize();
  const getModalWidth = () => {
    if (width < 700) return "85vw";
    if (width < 900) return "70vw";
    if (width < 1200) return "45vw";
    else return "30vw";
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: getModalWidth(),
    bgcolor: theme.secondaryColor2,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          textTransform: "capitalize",
          mt: 1.5,
          p: 0.8,
          minWidth: 0,
          ml: "12px",
        }}
        onClick={handleOpen}
      >
        <Delete fontSize="small" />
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Warning Icon */}
          <Box mb={1}>
            <WarningAmber sx={{ fontSize: 60 }} />
          </Box>

          {/* Title */}
          <Typography sx={{ fontWeight: "bold", fontSize: "1.8rem" }}>
            Delete Task
          </Typography>

          {/* Message */}
          <Typography variant="body1" color="text.secondary">
            You're going to delete this task. Are you sure?
          </Typography>

          <Box display={"flex"} gap={2} mt={4}>
            <Button onClick={handleClose} variant="outlined">
              No, Keep It.
            </Button>
            <Button onClick={onConfirm} variant="contained">
              Yes, Delete!
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteTask;
