import axiosInstance from "../../utils/axiosInstance";

const getStudentCertificate = async (id) => {
  try {
    const response = await axiosInstance.get(`/student/certificate?id=${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
export default getStudentCertificate;
