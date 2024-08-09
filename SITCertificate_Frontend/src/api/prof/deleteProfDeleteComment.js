import axiosInstance from "../../utils/axiosInstance";

const deleteProfDeleteComment = async (id) => {
  const response = await axiosInstance.delete(
    `/prof/deleteComment?id=${id}`
  );
  return response;
};

export default deleteProfDeleteComment;