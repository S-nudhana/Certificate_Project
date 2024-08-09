import axiosInstance from "../../utils/axiosInstance";

const getAdminProfEventData = async () => {
  const response = await axiosInstance.get(`/user/allEvent`);
  return response;
};

export default getAdminProfEventData;