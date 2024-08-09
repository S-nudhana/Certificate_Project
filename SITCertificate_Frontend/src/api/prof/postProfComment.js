import axiosInstance from "../../utils/axiosInstance";

const postProfComment = async (id, newCommentDetail) => {
  const response = await axiosInstance.post(`/prof/newComment`, {
    eventId: id,
    detail: newCommentDetail,
  });
  return response;
};

export default postProfComment;
