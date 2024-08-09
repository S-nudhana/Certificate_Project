import axiosInstance from "../../utils/axiosInstance";

export const studentSignIn = async (email, password) => {
  try {
    const response = await axiosInstance.post("/student/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateStudentGenerateStatus = async (id) => {
  try {
    const response = await axiosInstance.put(`/student/generated?id=${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const studentGenerate = async (id) => {
  try {
    const response = await axiosInstance.get(`/student/generate?id=${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const studentEventDataById = async (id) => {
  try {
    const response = await axiosInstance.get(`/student/eventId?id=${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const studentData = async () => {
  try {
    const response = await axiosInstance.get(`/student/event`);
    return response;
  } catch (error) {
    return error;
  }
};

export const studentCertificate = async (id) => {
  try {
    const response = await axiosInstance.get(`/student/certificate?id=${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const generateStudentCertificateInfo = async (id, name, surname, email) => {
  try {
    const response = await axiosInstance.put(`/student/certificateinfo`, {
      eventId: id,
      name: name,
      surname: surname,
      email: email,
    });
    return response;
  } catch (error) {
    return error;
  }
};
