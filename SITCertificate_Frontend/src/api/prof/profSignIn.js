import axiosInstance from "../../utils/axiosInstance";

const profSignIn = async (email,password) => {
  try {
    const response = await axiosInstance.post("/prof/login", {
        email,
        password,
    });
    return response;
  } catch (error) {
    return error;
  }
}
export default profSignIn;

