import axiosInstance from "../../utils/axiosInstance";

const studentSignIn = async (email,password) => {
  try {
    const response = await axiosInstance.post("/student/login", {
        email,
        password,
    });
    return response;
  } catch (error) {
    return error;
  }
}
export default studentSignIn;

