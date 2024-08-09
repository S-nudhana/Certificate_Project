import axiosInstance from "../../utils/axiosInstance";

const getStudentData = async () => {
    try {
        const response = await axiosInstance.get(`/student/event`);
        return response;
    } catch (error) {
        return error;
    }
}

export default getStudentData;