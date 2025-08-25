import axiosInstance from "../axios";

interface CommnetRequest {
  content: string;
}

export const fetchAllComments = (
  taskId: string,
  page: number,
  direction: boolean
) => {
  const dir = direction ? "desc" : "asc";
  return axiosInstance(
    `/authenticated/comments/page/${taskId}?page=${page}&direction=${dir}`
  );
};

export const addComment = (taskId: string, comment: string) => {
  const body: CommnetRequest = { content: comment };
  return axiosInstance.post(`/authenticated/comments/${taskId}`, body);
};

export const updateComment = (
  taskId: string,
  commentId: string,
  comment: string
) => {
  const body: CommnetRequest = { content: comment };
  return axiosInstance.put(
    `/authenticated/comments/${taskId}/${commentId}`,
    body
  );
};

export const deleteComment = (taskId: string, commentId: string) => {
  return axiosInstance.delete(`/authenticated/comments/${taskId}/${commentId}`);
};
