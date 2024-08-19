import axiosInstance from "../../utils/axiosInstance";

export const profSignIn = async(email, password) => {
    try {
        const response = await axiosInstance.post("/prof/login", {
            email,
            password,
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const profSignUp = async(username, email, password) => {
    try {
        const response = await axiosInstance.post("/prof/register", {
            username,
            email,
            password,
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const toggleCommentStatus = async(commentId) => {
    const response = await axiosInstance.put(`/prof/updateCommentStatus`, {
        commentId: commentId,
    });
    return response;
};

export const profAddComment = async(id, newCommentDetail) => {
    const response = await axiosInstance.post(`/prof/newComment`, {
        eventId: id,
        detail: newCommentDetail,
    });
    return response;
};

export const profApproveEvent = async(id) => {
    const response = await axiosInstance.put(`/prof/approveEvent`, {
        eventId: id,
    });
    return response;
};

export const profEmail = async(profId) => {
    const response = await axiosInstance.get(`/prof/email?id=${profId}`);
    return response;
};

export const profDeleteComment = async(id) => {
    const response = await axiosInstance.delete(`/prof/deleteComment?id=${id}`);
    return response;
};

export const profSendEmail = async(id, sender, eventName, commentDetail) => {
    const response = await axiosInstance.post("/prof/sendEmail", {
        id: id,
        subject: "แจ้งเตือนจาก SIT Certificate",
        eventName: eventName,
        commentDetail: commentDetail
    });
    return response;
};