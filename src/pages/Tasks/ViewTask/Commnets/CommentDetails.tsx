import { Box, Typography, Link } from "@mui/material";
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
import { deleteComment } from "../../../../utils/services/commentService";
import { useParams } from "react-router-dom";
import type { AxiosError } from "axios";
import { setMessage } from "../../../../utils/redux/slices/commonSlice";

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
    <Box display="flex" flexDirection="column" my={3} gap={0.7}>
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

      <Typography variant="body1" sx={{ pl: 5 }}>
        {content}
      </Typography>

      {loggedInUser.employeeId === createdBy.employeeId && (
        <Box display="flex" alignItems="center" gap={1} sx={{ pl: 5 }}>
          <Link underline="hover" fontSize="0.8rem" sx={{ color: "gray" }}>
            Edit
          </Link>
          <Typography variant="body2" sx={{ color: "gray", fontWeight: 600 }}>
            •
          </Typography>

          <Link
            underline="hover"
            fontSize="0.8rem"
            sx={{ color: "gray" }}
            onClick={handleDelete}
          >
            Delete
          </Link>
        </Box>
      )}
    </Box>
  );
}
