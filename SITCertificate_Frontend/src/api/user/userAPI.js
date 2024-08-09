import axiosInstance from "../../utils/axiosInstance";

export const userVerifyToken = async () => {
  try {
    const response = await axiosInstance.get("/user/verifyToken");
    return response;
  } catch (error) {
    return { authenticated: false };
  }
};

export const userDeleteToken = async (token) => {
  try {
    await axiosInstance.delete(`/user/deleteToken?token=${token}`);
  } catch (error) {
    return error;
  }
};

export const userSearchEvent = async (eventName) => {
  const response = await axiosInstance.get(
    `/user/searchEvent?eventName=${eventName}`
  );
  return response;
};

export const userEventData = async () => {
  const response = await axiosInstance.get(`/user/allEvent`);
  return response;
};

export const userEventDataById = async (id) => {
  const response = await axiosInstance.get(`/user/event?id=${id}`);
  return response;
};

export const userComment = async (id) => {
  const response = await axiosInstance.get(`/user/comment?id=${id}`);
  return response;
};

export const userHistory = async (eventName) => {
  const response = await axiosInstance.get(`/user/history?eventName=${eventName}`);
  return response;
};