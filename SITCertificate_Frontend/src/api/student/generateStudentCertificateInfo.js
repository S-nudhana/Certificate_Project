import axiosInstance from "../../utils/axiosInstance";

const generateStudentCertificateInfo = async (id, name, surname, email) => {
  try {
    const response = await axiosInstance.put(`/student/certificateinfo`, {
      eventId: id,
      name: name,
      surname: surname,
      email: email,
    });
    return response;
  } catch (error) {
    return error;
  }
};
export default generateStudentCertificateInfo;
