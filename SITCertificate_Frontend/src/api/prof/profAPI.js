import axiosInstance from "../../utils/axiosInstance";

export const profSignIn = async (email, password) => {
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

export const profSignUp = async (username, email, password) => {
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

export const toggleCommentStatus = async (commentId) => {
  try {
    const response = await axiosInstance.put(`/prof/updateCommentStatus`, {
      commentId: commentId,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const profAddComment = async (id, newCommentDetail) => {
  try {
    const response = await axiosInstance.post(`/prof/newComment`, {
      eventId: id,
      detail: newCommentDetail,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const profApproveEvent = async (id) => {
  try {
    const response = await axiosInstance.put(`/prof/approveEvent`, {
      eventId: id,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const profEmail = async (profId) => {
  try {
    const response = await axiosInstance.get(`/prof/email?id=${profId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const profDeleteComment = async (id) => {
  try {
    const response = await axiosInstance.delete(`/prof/deleteComment?id=${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const profSendEmail = async (id, eventName, commentDetail) => {
  try {
    const response = await axiosInstance.post("/prof/sendEmail", {
      id: id,
      subject: "แจ้งเตือนจาก SIT Certificate",
      eventName: eventName,
      commentDetail: commentDetail,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const profForgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post("/prof/forgotPassword", {
      email: email,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const profSendResetPasswordEmail = async (email) => {
  try {
    const response = await axiosInstance.post("/prof/sendResetPasswordEmail", {
      email: email,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const profResetPassword = async (email, pin, password, refCode) => {
  try {
    const response = await axiosInstance.post("/prof/resetPassword", {
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
