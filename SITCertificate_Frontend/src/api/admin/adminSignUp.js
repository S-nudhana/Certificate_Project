import axios from "../../utils/axiosInstance";

const adminSignUp = async (username,email,password) => {
  try {
    const response = await axios.post("/admin/register", {
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

