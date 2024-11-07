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
  emailTemplate,
  inputSize,
  inputY
) => {
  try {
    const response = await axiosInstance.post("/admin/createEvent", {
      eventName: eventName,
      eventOwner: eventOwnerName,
      openDate: openDate,
      closeDate: closeDate,
      thumbnail: uploadedThumbnailURL,
      template: uploadedTemplateURL,
      excel: uploadedExcelURL,
      emailTemplate: emailTemplate,
      inputSize: inputSize,
      inputY: inputY,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const adminDeleteEvent = async (eventId) => {
  try {
    const response = await axiosInstance.delete(
      `/admin/deleteEvent?id=${eventId}`
    );
    return response;
  } catch (error) {
    return error;
  }
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
  id
) => {
  try {
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
  } catch (error) {
    return error;
  }
};

export const adminToggleCommentStatus = async (commentId) => {
  try {
    const response = await axiosInstance.put(`/admin/updateCommentStatus`, {
      commentId: commentId,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const adminSendEmail = async (reciever, eventName, commentDetail) => {
  try {
    const response = await axiosInstance.post("/admin/sendEmail", {
      to: reciever,
      subject: "แจ้งเตือนจาก SIT Certificate",
      text: `กิจกรรม ${eventName} ความคิดเห็น ${commentDetail} ได้รับการแก้ไขโดยเจ้าหน้าที่แล้ว โปรดตรวจสอบใหม่อีกครั้ง`,
      html: `<p>กิจกรรม <b>${eventName}</b> ความคิดเห็น <b>${commentDetail}</b> ได้รับการแก้ไขโดยเจ้าหน้าที่แล้ว โปรดตรวจสอบใหม่อีกครั้ง</p>`,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const adminForgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post("/admin/forgotPassword", {
      email: email,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const adminSendResetPasswordEmail = async (email) => {
  try {
    const response = await axiosInstance.post("/admin/sendResetPasswordEmail", {
      email: email,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const adminResetPassword = async (email, pin, password) => {
  try {
    const response = await axiosInstance.post("/admin/resetPassword", {
      email: email,
      pin: pin,
      password: password,
    });
    return response;
  } catch (error) {
    return error;
  }
};
