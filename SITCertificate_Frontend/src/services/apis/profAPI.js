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

export const profSignUp = async (username, fullname, email, password) => {
  try {
    const response = await axiosInstance.post("/prof/register", {
      username,
      fullname,
      email,
      password,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const profAddComment = async (id, newCommentDetail) => {
  try {
    const response = await axiosInstance.post(`/prof/comment`, {
      eventId: id,
      detail: newCommentDetail,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const profDeleteComment = async (id) => {
  try {
    const response = await axiosInstance.delete(`/prof/comment/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const profApproveEvent = async (id) => {
  try {
    const response = await axiosInstance.put(`/prof/event/${id}/approve`);
    return response;
  } catch (error) {
    return error;
  }
};

export const profSendEmail = async (id, eventName, commentDetail) => {
  try {
    const response = await axiosInstance.post("/prof/email", {
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
    const response = await axiosInstance.post("/prof/resetPasswordEmail", {
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