import axiosInstance from "../../utils/axiosInstance";

const profSignUp = async (username,email,password) => {
  try {
    const response = await axiosInstance.post("/prof/register", {
        username,
        email,
        password,
    });
    return response;
  } catch (error) {
    return error;
  }
}
export default profSignUp;
