import axiosInstance from "../../../utils/axiosInstance";
import axios from "axios";

export const userVerifyToken = async () => {
  try {
    const response = await axiosInstance.get("/user/token");
    return response;
  } catch (error) {
    return { authenticated: false };
  }
};

export const userDeleteToken = async () => {
  try {
    const response = await axiosInstance.delete(`/user/token`);
    return response;
  } catch (error) {
    return error;
  }
};

export const userEventData = async () => {
  try {
    const response = await axiosInstance.get(`/user/event`);
    return response;
  } catch (error) {
    return error;
  }
};

export const userEventDataById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/event/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const userComment = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/comment?id=${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const userSearchEvent = async (eventName) => {
  try {
    const response = await axiosInstance.get(
      `/user/event/search?eventName=${eventName}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const userHistory = async (eventName) => {
  try {
    const response = await axiosInstance.get(
      `/user/history?eventName=${eventName}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getStatistic = async (eventId) => {
  try {
    const response = await axiosInstance.get(
      `/user/statistic?eventId=${eventId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const uploadFile = async (file, category) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post(
      `/user/uploadFile?category=${category}`,
      formData
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchFile = async (filepath) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_URL}file?filepath=${filepath}`,
      { responseType: "blob", withCredentials: true }
    );
    return URL.createObjectURL(response.data);
  } catch (error) {
    return error;
  }
};

export const fetchCertificate = async (filepath) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_URL}file?filepath=${filepath}`,
      { responseType: "blob", withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const userEmbedName = async (eventId, name, surname) => {
  try {
    const response = await axiosInstance.put(`/user/watermark`, {
      eventId: eventId,
      name: name,
      surname: surname,
    });
    return response;
  } catch (error) {
    return error;
  }
}