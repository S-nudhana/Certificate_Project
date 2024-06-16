import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;
