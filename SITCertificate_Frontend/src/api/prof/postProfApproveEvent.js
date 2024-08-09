import axiosInstance from "../../utils/axiosInstance";

const postProfApproveEvent = async (id) => {
  const response = await axiosInstance.put(`/prof/approveEvent`, {
    eventId: id,
  });
  return response;
};

export default postProfApproveEvent;