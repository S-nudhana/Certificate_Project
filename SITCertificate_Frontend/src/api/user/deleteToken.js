import axiosInstance from "../../utils/axiosInstance";

const deleteToken = async (token) => {
    try {
        await axiosInstance.delete(`/user/deleteToken?token=${token}`);
    } catch (error) {
        return error;
    }
}

export default deleteToken;