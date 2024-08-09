import axiosInstance from "../../utils/axiosInstance";

const deleteAdminDeleteEvent = async (eventId) => {
    const response = await axiosInstance.delete(`/admin/deleteEvent?id=${eventId}`);
    return response
}

export default deleteAdminDeleteEvent;