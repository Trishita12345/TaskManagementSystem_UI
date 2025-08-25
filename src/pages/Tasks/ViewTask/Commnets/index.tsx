import { Box, Button, Tooltip, Typography } from "@mui/material";
import CommentTextbox from "./CommentTextbox";
import CommentDetails from "./CommentDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllComments } from "../../../../utils/services/commentService";
import { useDispatch, useSelector } from "react-redux";
import {
  getTheme,
  setIsLoading,
  setMessage,
} from "../../../../utils/redux/slices/commonSlice";
import type { AxiosError } from "axios";
import { getErrorMessage } from "../../../../utils/helperFunctions/commonHelperFunctions";
import type { PaginatedResponse, Comment } from "../../../../constants/types";
import {
  KeyboardArrowDownSharp,
  KeyboardArrowRightSharp,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

export default function Comments() {
  const theme = useSelector(getTheme);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [allComments, setAllComments] =
    useState<PaginatedResponse<Comment> | null>(null);
  const [page, setPage] = useState<number>(0);
  const [direction, setDirection] = useState<boolean>(true); //Newest First
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const getAllComments = async (
    showLoading?: boolean,
    suuccessMsg?: string
  ) => {
    try {
      if (!id) return;
      showLoading && dispatch(setIsLoading(true));
      const { data } = await fetchAllComments(id, page, direction);
      let modifiedData;
      if (page && allComments) {
        modifiedData = {
          ...data,
          content: [...allComments.content, ...data.content],
        };
      } else {
        modifiedData = {
          ...data,
        };
      }
      setAllComments(modifiedData);
      if (suuccessMsg)
        dispatch(
          setMessage({
            display: true,
            severity: "success",
            message: suuccessMsg,
          })
        );
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
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    getAllComments();
  }, [id, page, direction]);

  return (
    <Box mt={2}>
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Button
          sx={{
            color: theme.secondaryContrast,
            ":hover": { backgroundColor: "transparent" },
          }}
          onClick={() => setCollapsed((prev: boolean) => !prev)}
          startIcon={
            collapsed ? <KeyboardArrowRightSharp /> : <KeyboardArrowDownSharp />
          }
        >
          <Typography variant="subtitle1" textTransform={"capitalize"}>
            Comments
          </Typography>
        </Button>
        <Tooltip title={direction ? "Newest First" : "Oldest First"} arrow>
          <Button
            onClick={() => setDirection((prev: boolean) => !prev)}
            variant="outlined"
            sx={{ minWidth: "10px", px: 1 }}
          >
            <FontAwesomeIcon
              icon={direction ? faArrowDownWideShort : faArrowUpWideShort}
            />
          </Button>
        </Tooltip>
      </Box>
      {collapsed ? null : (
        <>
          <CommentTextbox getAllComments={getAllComments} />
          {allComments && allComments.totalElements > 0 && (
            <>
              {allComments.content.map((comment: Comment, index: number) => (
                <CommentDetails
                  comment={comment}
                  idx={index}
                  key={comment.commentId}
                  getAllComments={getAllComments}
                />
              ))}
              {allComments.totalElements > 5 && (
                <>
                  {allComments.last ? (
                    <Button sx={{ ml: 4 }} onClick={() => setPage(0)}>
                      View Less
                    </Button>
                  ) : (
                    <Button
                      sx={{ ml: 4 }}
                      onClick={() => setPage((prev: number) => prev + 1)}
                    >
                      View more
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
}
