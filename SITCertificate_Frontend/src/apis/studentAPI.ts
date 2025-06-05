import axiosInstance from "../utils/axiosInstance";

interface ApiResponse<T = any> {
  data: T;
  status: number;
}

type AxiosError = any;

export const studentSignIn = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await axiosInstance.post("/student/login", {
      email,
      password,
    });
    return response;
  } catch (error:AxiosError) {
    return error;
  }
};

export const updateStudentGenerateStatus = async (
  id: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.put(`/student/status/${id}/update`);
    return response;
  } catch (error:AxiosError) {
    return error;
  }
};

export const studentGenerate = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.get(`/student/status/${id}`);
    return response;
  } catch (error:AxiosError) {
    return error;
  }
};

export const studentEventDataById = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.get(`/student/event/${id}`);
    return response;
  } catch (error:AxiosError) {
    return error;
  }
};

export const studentData = async (): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.get(`/student/events`);
    return response;
  } catch (error:AxiosError) {
    return error;
  }
};

export const studentCertificate = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.get(`/student/certificate/${id}`);
    return response;
  } catch (error:AxiosError) {
    return error;
  }
};

export const getGeneratedCertificate = async (
  id: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.get(
      `/student/certificate/${id}/generate`
    );
    return response;
  } catch (error:AxiosError) {
    return error;
  }
};

export const generateStudentCertificateInfo = async (
  id: string,
  name: string,
  surname: string,
  email: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.put(`/student/certificate/info`, {
      eventId: id,
      name,
      surname,
      email,
    });
    return response;
  } catch (error:AxiosError) {
    return error;
  }
};

export const generateExampleCertificate = async (
  id: string,
  name: string,
  surname: string
): Promise<string | any> => {
  try {
    const response = await axiosInstance.put(
      `/student/certificate/example`,
      {
        eventId: id,
        name,
        surname,
      },
      {
        responseType: "blob",
      }
    );
    return URL.createObjectURL(response.data);
  } catch (error:AxiosError) {
    return error;
  }
};

export const sendCertificate = async (
  id: string,
  file: string
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post(`/student/certificate`, {
      id,
      fileUrl: file,
    });
    return response;
  } catch (error:AxiosError) {
    return error;
  }
};
