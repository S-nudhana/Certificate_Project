import axiosInstance from "../../utils/axiosInstance";

export const adminSignIn = async(email, password) => {
    try {
        const response = await axiosInstance.post("/admin/login", {
            email,
            password,
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const adminSignUp = async(username, email, password) => {
    try {
        const response = await axiosInstance.post("/admin/register", {
            username,
            email,
            password,
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const adminCreateEvent = async(
    eventName,
    eventOwnerName,
    openDate,
    closeDate,
    uploadedThumbnailURL,
    uploadedTemplateURL,
    uploadedExcelURL
) => {
    const response = await axiosInstance.post("/admin/createEvent", {
        eventName: eventName,
        eventOwner: eventOwnerName,
        openDate: openDate,
        closeDate: closeDate,
        thumbnail: uploadedThumbnailURL,
        template: uploadedTemplateURL,
        excel: uploadedExcelURL,
    });
    return response;
};

export const adminDeleteEvent = async(eventId) => {
    const response = await axiosInstance.delete(
        `/admin/deleteEvent?id=${eventId}`
    );
    return response;
};

export const adminUpdateEvent = async(
    eventName,
    eventOwnerName,
    openDate,
    closeDate,
    uploadedThumbnailURL,
    uploadedTemplateURL,
    uploadedExcelURL,
    id
) => {
    const response = await axiosInstance.put(`/admin/updateEvent`, {
        eventName: eventName,
        eventOwner: eventOwnerName,
        openDate: openDate,
        closeDate: closeDate,
        thumbnail: uploadedThumbnailURL,
        template: uploadedTemplateURL,
        excel: uploadedExcelURL,
        eventId: id.id,
    });
    return response;
};

export const adminToggleCommentStatus = async(commentId) => {
    const response = await axiosInstance.put(`/admin/updateCommentStatus`, {
        commentId: commentId,
    });
    return response;
};

export const adminSendEmail = async(reciever, eventName, commentDetail) => {
    const response = await axiosInstance.post("/admin/sendEmail", {
        to: reciever,
        subject: "แจ้งเตือนจาก SIT Certificate",
        text: `กิจกรรม ${eventName} ความคิดเห็น ${commentDetail} ได้รับการแก้ไขโดยเจ้าหน้าที่แล้ว`,
        html: `<p>กิจกรรม ${eventName} ความคิดเห็น ${commentDetail} ได้รับการแก้ไขโดยเจ้าหน้าที่แล้ว</p>`,
    });
    return response;
};