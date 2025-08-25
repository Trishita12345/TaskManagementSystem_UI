import { useEffect, useRef, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getTheme,
  setMessage,
} from "../../../../utils/redux/slices/commonSlice";
import CustomEmployeeAvatar from "../../../../components/CustomEmployeeAvatar";
import { userDetails } from "../../../../utils/redux/slices/authenticationSlice";
import EditModeButtonGroup from "../components/EditModeButtonGroup";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { getErrorMessage } from "../../../../utils/helperFunctions/commonHelperFunctions";
import { addComment } from "../../../../utils/services/commentService";

export default function CommentTextbox({
  getAllComments,
}: {
  getAllComments: () => void;
}) {
  const theme = useSelector(getTheme);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const loggedInUser = useSelector(userDetails);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const { id } = useParams();
  const dispatch = useDispatch();

  // Shortcut: Press "M" to focus the comment box
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSave = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      await addComment(id, value);
      getAllComments();
      setIsEditMode(false);
      setValue("");
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
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" alignItems="flex-start" gap={1}>
        <CustomEmployeeAvatar employeeDetails={loggedInUser} />
        <TextField
          size="small"
          inputRef={inputRef}
          onFocus={() => setIsEditMode(true)}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a comment..."
          value={value}
          multiline
          fullWidth
          minRows={1}
          maxRows={4}
          variant="outlined"
        />
      </Box>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent={"space-between"}
      >
        <Typography color="text.secondary" sx={{ pl: 6, fontSize: "12px" }}>
          <b style={{ fontSize: "12px" }}>Pro tip:</b> press{" "}
          <span
            style={{
              backgroundColor: theme.secondaryColor3,
              padding: "1px 4px",
              borderRadius: "4px",
              fontSize: "10px",
              fontWeight: 600,
            }}
          >
            M
          </span>{" "}
          to comment
        </Typography>
        <Box visibility={isEditMode ? "visible" : "hidden"}>
          <EditModeButtonGroup
            loading={isLoading}
            onCancel={() => {
              setIsEditMode(false);
              setValue("");
            }}
            onSave={handleSave}
          />
        </Box>
      </Box>
    </Box>
  );
}
