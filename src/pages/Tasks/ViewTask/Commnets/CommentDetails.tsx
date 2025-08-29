import { Box, Typography, Tooltip } from "@mui/material";
import type { Comment } from "../../../../constants/types";
import CustomEmployeeAvatar from "../../../../components/CustomEmployeeAvatar";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../../../../utils/redux/slices/authenticationSlice";
import { isEqual } from "date-fns";
import {
  getDateDiff,
  getErrorMessage,
} from "../../../../utils/helperFunctions/commonHelperFunctions";
import { colors } from "../../../../constants/colors";
import {
  deleteComment,
  updateComment,
} from "../../../../utils/services/commentService";
import { useParams } from "react-router-dom";
import type { AxiosError } from "axios";
import { setMessage } from "../../../../utils/redux/slices/commonSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import EditModeButtonGroup from "../components/EditModeButtonGroup";
import TextEditor from "../../../../components/TextEditor";

interface CommentDetailsProps {
  getAllComments: (showLoading?: boolean, suuccessMsg?: string) => void;
  comment: Comment;
  idx: number;
}

export default function CommentDetails({
  getAllComments,
  comment,
  idx,
}: CommentDetailsProps) {
  const loggedInUser = useSelector(userDetails);
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [textBoxContent, setTextBoxContent] = useState<string>("");
  const { commentId, content, createdBy, createdAt, updatedAt } = comment;
  const dispatch = useDispatch();

  const handleCatch = (err: AxiosError<{ message: string }>) => {
    dispatch(
      setMessage({
        display: true,
        severity: "error",
        message: getErrorMessage(err),
      })
    );
  };
  const handleCancel = () => {
    setIsEditMode(false);
    setTextBoxContent("");
  };

  const handleEdit = async () => {
    if (!id) return;
    try {
      setLoading(true);
      await updateComment(id, commentId, textBoxContent);
      getAllComments();
      setIsEditMode(false);
    } catch (e: any) {
      handleCatch(e);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteComment(id, commentId);
      getAllComments(false, "Comment deleted successfully");
    } catch (e: any) {
      handleCatch(e);
    }
  };
  return (
    <Box display="flex" flexDirection="column" mt={3}>
      <Box display="flex" alignItems="center" gap={1}>
        <CustomEmployeeAvatar
          employeeDetails={createdBy}
          bgColor={colors[idx % colors.length]}
        />
        <Box>
          <Typography fontWeight={600} variant="body2">
            {createdBy.firstName}&nbsp;{createdBy.lastName}
          </Typography>
          <Box display="flex" alignItems="center" gap={0.3}>
            <Typography fontSize={"10px"} color="text.secondary">
              {getDateDiff(createdAt)}
            </Typography>
            {!isEqual(createdAt, updatedAt) && (
              <Typography fontSize={"10px"} color="text.secondary">
                (edited)
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ pl: 6 }}>
        {isEditMode ? (
          <>
            <Box width={"100%"}>
              <TextEditor
                value={textBoxContent}
                onChange={(value: string) => setTextBoxContent(value)}
                height="60px"
              />
            </Box>
            <EditModeButtonGroup
              loading={loading}
              onSave={handleEdit}
              onCancel={handleCancel}
            />
          </>
        ) : (
          <>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            {loggedInUser.employeeId === createdBy.employeeId && (
              <Box display="flex" alignItems="center" gap={1}>
                <Tooltip title="Edit">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{
                      fontSize: "12px",
                      color: "gray",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setIsEditMode(true);
                      setTextBoxContent(content);
                    }}
                  />
                </Tooltip>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", fontWeight: 600 }}
                >
                  •
                </Typography>
                <Tooltip title={"Delete"}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{
                      fontSize: "12px",
                      color: "gray",
                      cursor: "pointer",
                    }}
                    onClick={handleDelete}
                  />
                </Tooltip>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
