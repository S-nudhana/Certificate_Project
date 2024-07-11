import axios from "../../utils/axiosInstance";

const studentSignIn = async (email,password) => {
  try {
    const response = await axios.post("/student/login", {
        email,
        password,
    });
    return response;
  } catch (error) {
    return error;
  }
}
export default studentSignIn;

