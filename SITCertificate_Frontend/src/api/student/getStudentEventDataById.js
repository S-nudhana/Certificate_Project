import axiosInstance from "../../utils/axiosInstance";

const getStudentEventDataById = async (id) => {
  try {
    const response = await axiosInstance.get(`/student/eventId?id=${id}`);
    return response;
  } catch (error) {
    return error;
  }
}
export default getStudentEventDataById;