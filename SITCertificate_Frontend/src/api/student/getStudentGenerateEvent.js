import axiosInstance from "../../utils/axiosInstance";

const getStudentGenerate = async (id) => {
    try {
        const response = await axiosInstance.get(`/student/generate?id=${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export default getStudentGenerate;