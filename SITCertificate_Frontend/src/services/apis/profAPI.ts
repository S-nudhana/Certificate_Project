import axiosInstance from "../../utils/axiosInstance";

interface ApiResponse<T = any> {
  data: T;
  status: number;
}

type AxiosError = any;

export const profSignIn = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await axiosInstance.post("/prof/login", {
      email,
      password,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const profSignUp = async (
  username: string,
  fullname: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await axiosInstance.post("/prof/register", {
      username,
      fullname,
      email,
      password,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const profAddComment = async (
  id: number,
  newCommentDetail: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post(`/prof/comment`, {
      eventId: id,
      detail: newCommentDetail,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const profDeleteComment = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.delete(`/prof/comment/${id}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const profApproveEvent = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.put(`/prof/event/${id}/approve`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const profSendEmail = async (
  id: number,
  eventName: string,
  commentDetail: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post("/prof/email", {
      id: id,
      subject: "แจ้งเตือนจาก SIT Certificate",
      eventName: eventName,
      commentDetail: commentDetail,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const profForgotPassword = async (
  email: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post("/prof/forgotPassword", {
      email: email,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const profSendResetPasswordEmail = async (
  email: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post("/prof/resetPasswordEmail", {
      email: email,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const profResetPassword = async (
  email: string,
  pin: string,
  password: string,
  refCode: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post("/prof/resetPassword", {
      email: email,
      pin: pin,
      password: password,
      refCode: refCode,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};
