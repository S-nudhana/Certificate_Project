import axiosInstance from "../../utils/axiosInstance";

const verifyToken = async () => {
  try {
    const response = await axiosInstance.get("/user/verifyToken");
    // setAuthStatus(response.data);
    return response;
  } catch (error) {
    return { authenticated: false };
    // setAuthStatus({ authenticated: false });
  }
};

export default verifyToken;