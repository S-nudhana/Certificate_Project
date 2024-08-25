import axiosInstance from "../../utils/axiosInstance";

export const adminSignIn = async (email, password) => {
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

export const adminSignUp = async (username, email, password) => {
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

export const adminCreateEvent = async (
  eventName,
  eventOwnerName,
  openDate,
  closeDate,
  uploadedThumbnailURL,
  uploadedTemplateURL,
  uploadedExcelURL,
  emailTemplate
) => {
  const response = await axiosInstance.post("/admin/createEvent", {
    eventName: eventName,
    eventOwner: eventOwnerName,
    openDate: openDate,
    closeDate: closeDate,
    thumbnail: uploadedThumbnailURL,
    template: uploadedTemplateURL,
    excel: uploadedExcelURL,
    emailTemplate: emailTemplate,
  });
  return response;
};

export const adminDeleteEvent = async (eventId) => {
  const response = await axiosInstance.delete(
    `/admin/deleteEvent?id=${eventId}`
  );
  return response;
};

export const adminUpdateEvent = async (
  eventName,
  eventOwnerName,
  openDate,
  closeDate,
  uploadedThumbnailURL,
  uploadedTemplateURL,
  uploadedExcelURL,
  emailTemplate,
  id,
) => {
  const response = await axiosInstance.put(`/admin/updateEvent`, {
    eventName: eventName,
    eventOwner: eventOwnerName,
    openDate: openDate,
    closeDate: closeDate,
    thumbnail: uploadedThumbnailURL,
    template: uploadedTemplateURL,
    excel: uploadedExcelURL,
    emailTemplate: emailTemplate,
    eventId: id,
  });
  return response;
};

export const adminToggleCommentStatus = async (commentId) => {
  const response = await axiosInstance.put(`/admin/updateCommentStatus`, {
    commentId: commentId,
  });
  return response;
};

export const adminSendEmail = async (reciever, eventName, commentDetail) => {
  const response = await axiosInstance.post("/admin/sendEmail", {
    to: reciever,
    subject: "แจ้งเตือนจาก SIT Certificate",
    text: `กิจกรรม ${eventName} ความคิดเห็น ${commentDetail} ได้รับการแก้ไขโดยเจ้าหน้าที่แล้ว โปรดตรวจสอบใหม่อีกครั้ง`,
    html: `<p>กิจกรรม <b>${eventName}</b> ความคิดเห็น <b>${commentDetail}</b> ได้รับการแก้ไขโดยเจ้าหน้าที่แล้ว โปรดตรวจสอบใหม่อีกครั้ง</p>`,
  });
  return response;
};
