import axiosInstance from "../../utils/axiosInstance";

interface ApiResponse<T = any> {
  data: T;
  status: number;
}

type AxiosError = any;

export const adminSignIn = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await axiosInstance.post("/admin/login", {
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

export const adminSignUp = async (
  username: string,
  fullname: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await axiosInstance.post("/admin/register", {
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

export const adminCreateEvent = async (
  eventName: string,
  eventOwnerName: string,
  openDate: string,
  closeDate: string,
  uploadedThumbnailURL: string,
  uploadedTemplateURL: string,
  uploadedExcelURL: string,
  emailTemplate: string,
  inputSize: number,
  inputY: number
): Promise<ApiResponse> => {
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
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const adminDeleteEvent = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.delete(`/admin/event/${id}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const adminUpdateEvent = async (
  eventName: string,
  eventOwnerName: string,
  openDate: string,
  closeDate: string,
  uploadedThumbnailURL: string,
  uploadedTemplateURL: string,
  uploadedExcelURL: string,
  emailTemplate: string,
  inputSize: number,
  inputY: number,
  id: number
): Promise<ApiResponse> => {
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
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const adminUpdateCommentStatus = async (
  id: number
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.put(`/admin/comment/${id}/status`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const adminSendEmail = async (
  reciever: string,
  eventName: string,
  commentDetail: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post("/admin/email", {
      to: reciever,
      subject: "แจ้งเตือนจาก SIT Certificate",
      text: `กิจกรรม ${eventName} ความคิดเห็น ${commentDetail} ได้รับการแก้ไขโดยเจ้าหน้าที่แล้ว โปรดตรวจสอบใหม่อีกครั้ง`,
      html: `<p>กิจกรรม <b>${eventName}</b> ความคิดเห็น <b>${commentDetail}</b> ได้รับการแก้ไขโดยเจ้าหน้าที่แล้ว โปรดตรวจสอบใหม่อีกครั้ง</p>`,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const adminForgotPassword = async (
  email: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post("/admin/forgotPassword", {
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

export const adminSendResetPasswordEmail = async (
  email: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post("/admin/resetPassword/email", {
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

export const adminResetPassword = async (
  email: string,
  pin: string,
  password: string,
  refCode: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post("/admin/resetPassword", {
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

export const getProfessorEmail = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.get(`/admin/email/${id}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const getProfessor = async (): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.get(`/admin/event/professor`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};

export const embedName = async (
  template: File,
  inputSize: number,
  inputY: number,
  directory: string
): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", template);
    formData.append("inputSize", inputSize.toString());
    formData.append("inputY", inputY.toString());
    const response = await axiosInstance.post(
      `/admin/watermark?category=${directory}`,
      formData, {
        responseType: "blob",
      }
    );
    return {
      data: URL.createObjectURL(response.data),
      status: response.status,
    };
  } catch (error:AxiosError) {
    return error;
  }
};
