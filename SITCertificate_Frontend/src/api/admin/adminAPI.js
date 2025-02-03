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
    const response = await axiosInstance.post("/admin/event", {
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

export const adminDeleteEvent = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/admin/event/${id}`
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
  inputSize,
  inputY,
  id
) => {
  try {
    const response = await axiosInstance.put(`/admin/event`, {
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
      eventId: id,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const adminToggleCommentStatus = async (id) => {
  try {
    const response = await axiosInstance.put(`/admin/comment/${id}/status`, {
      commentId: commentId,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const adminSendEmail = async (reciever, eventName, commentDetail) => {
  try {
    const response = await axiosInstance.post("/admin/email", {
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
    const response = await axiosInstance.post("/admin/resetPasswordEmail", {
      email: email,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const adminResetPassword = async (email, pin, password, refCode) => {
  try {
    const response = await axiosInstance.post("/admin/resetPassword", {
      email: email,
      pin: pin,
      password: password,
      refCode: refCode,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const profEmail = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/email/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getProfessor = async () => {
  try {
    const response = await axiosInstance.get(`/admin/professor`);
    return response;
  } catch (error) {
    return error;
  }
}