import axiosInstance from "../../utils/axiosInstance";

const updateStudentGenerateStatus = async (id) => {
  try {
    const response = await axiosInstance.put(`/student/generated?id=${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
export default updateStudentGenerateStatus;
