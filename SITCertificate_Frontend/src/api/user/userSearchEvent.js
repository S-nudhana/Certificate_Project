import axiosInstance from "../../utils/axiosInstance";

const userSearchEvent = async (eventName) => {
  const response = await axiosInstance.get(
    `/user/searchEvent?eventName=${eventName}`
  );
  return response;
};

export default userSearchEvent;