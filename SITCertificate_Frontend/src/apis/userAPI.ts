import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

interface ApiResponse<T = any> {
  data: T;
  status: number;
}

type AxiosError = any;

export const userVerifyToken = async (): Promise<ApiResponse | { authenticated: false }> => {
  try {
    const response = await axiosInstance.get("/user/token");
    return response;
  } catch (error: AxiosError) {
    return { authenticated: false };
  }
};

export const userDeleteToken = async (): Promise<ApiResponse> => {
  try {
    return await axiosInstance.delete("/user/token");
  } catch (error: AxiosError) {
    return Promise.reject(error);
  }
};

export const userEventData = async (): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.get("/user/event");
    return response;
  } catch (error: AxiosError) {
    return Promise.reject(error);
  }
};

export const userEventDataById = async (id: string): Promise<ApiResponse> => {
  try {
    return await axiosInstance.get(`/user/event/${id}`);
  } catch (error: AxiosError) {
    return Promise.reject(error);
  }
};

export const userComment = async (id: string): Promise<ApiResponse> => {
  try {
    return await axiosInstance.get(`/user/comment?id=${id}`);
  } catch (error: AxiosError) {
    return Promise.reject(error);
  }
};

export const userSearchEvent = async (eventName: string): Promise<ApiResponse> => {
  try {
    return await axiosInstance.get(`/user/event/search?eventName=${eventName}`);
  } catch (error: AxiosError) {
    return Promise.reject(error);
  }
};

export const userHistory = async (eventName: string): Promise<ApiResponse> => {
  try {
    return await axiosInstance.get(`/user/history?eventName=${eventName}`);
  } catch (error: AxiosError) {
    return Promise.reject(error);
  }
};

export const getStatistic = async (eventId: string): Promise<ApiResponse> => {
  try {
    return await axiosInstance.get(`/user/statistic?eventId=${eventId}`);
  } catch (error: AxiosError) {
    return Promise.reject(error);
  }
};

export const uploadFile = async (file: File, category: string): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    return await axiosInstance.post(`/user/uploadFile?category=${category}`, formData);
  } catch (error: AxiosError) {
    return Promise.reject(error);
  }
};

export const fetchFile = async (filepath: string): Promise<string | null> => {
  if (!filepath || filepath.trim() === "") return null;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_URL}file?filepath=${filepath}`,
      { responseType: "blob", withCredentials: true }
    );
    return URL.createObjectURL(response.data);
  } catch (error: AxiosError) {
    return Promise.reject(error);
  }
};

export const fetchCertificate = async (filepath: string): Promise<Blob | null> => {
  if (!filepath || filepath.trim() === "") return null;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_URL}file?filepath=${encodeURIComponent(filepath)}`,
      { responseType: "blob", withCredentials: true }
    );
    return response.data;
  } catch (error: AxiosError) {
    return Promise.reject(error);
  }
};

export const userEmbedName = async (
  eventId: number,
  name: string,
  surname: string
): Promise<ApiResponse> => {
  try {
    return await axiosInstance.put("/user/watermark", {
      eventId,
      name,
      surname,
    });
  } catch (error: AxiosError) {
    return Promise.reject(error);
  }
};
