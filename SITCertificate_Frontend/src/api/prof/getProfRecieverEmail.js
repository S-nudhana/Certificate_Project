import axiosInstance from "../../utils/axiosInstance";

const getProfRecieverEmail = async (profId) => {
  const response = await axiosInstance.get(`/prof/email?id=${profId}`);
  return response;
};

export default getProfRecieverEmail;
