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
  try {
    const response = await axiosInstance.get(`/user/allEvent`);
    return response;
  } catch (error) {
    return error;
  }
};

export const userEventDataById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/event?id=${id}`);
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
