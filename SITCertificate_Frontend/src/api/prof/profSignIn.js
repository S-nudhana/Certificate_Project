import axios from "../../utils/axiosInstance";

const profSignIn = async (email,password) => {
  try {
    const response = await axios.post("/prof/login", {
        email,
        password,
    });
    return response;
  } catch (error) {
    return error;
  }
}
export default profSignIn;

