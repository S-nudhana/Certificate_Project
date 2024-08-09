import axiosInstance from "../../utils/axiosInstance";

const adminSignUp = async (username,email,password) => {
  try {
    const response = await axiosInstance.post("/admin/register", {
        username,
        email,
        password,
    });
    return response;
  } catch (error) {
    return error;
  }
}
export default adminSignUp;

