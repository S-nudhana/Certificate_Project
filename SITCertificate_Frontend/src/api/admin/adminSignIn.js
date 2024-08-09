import axiosInstance from "../../utils/axiosInstance";

const adminSignIn = async (email,password) => {
  try {
    const response = await axiosInstance.post("/admin/login", {
        email,
        password,
    });
    return response;
  } catch (error) {
    return error;
  }
}
export default adminSignIn;

