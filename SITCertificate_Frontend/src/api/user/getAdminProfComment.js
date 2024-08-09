import axiosInstance from "../../utils/axiosInstance";

const userSearchEvent = async (id) => {
  const response = await axiosInstance.get(`/user/comment?id=${id}`);
  return response;
};

export default userSearchEvent;