import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_URL,
    timeout: 5000,
    withCredentials: true,
});

export default axiosInstance;