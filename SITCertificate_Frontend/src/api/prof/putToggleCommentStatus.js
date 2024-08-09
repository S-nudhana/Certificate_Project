import axiosInstance from "../../utils/axiosInstance";

const putToggleCommentStatus = async (commentId) => {
    const response = await axiosInstance.put(`/prof/updateCommentStatus`, {
        commentId: commentId,
    });
    return response;
};
export default putToggleCommentStatus;