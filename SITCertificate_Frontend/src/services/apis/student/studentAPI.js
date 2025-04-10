import axiosInstance from "../../../utils/axiosInstance";

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
    const response = await axiosInstance.put(`/student/status/${id}/update`);
    return response;
  } catch (error) {
    return error;
  }
};

export const studentGenerate = async (id) => {
  try {
    const response = await axiosInstance.get(`/student/status/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const studentEventDataById = async (id) => {
  try {
    const response = await axiosInstance.get(`/student/event/${id}`);
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
    const response = await axiosInstance.get(`/student/certificate/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getGeneratedCertificate = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/student/certificate/${id}/generate`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const generateStudentCertificateInfo = async (
  id,
  name,
  surname,
  email,
  uploadedModifiedPdf
) => {
  try {
    const response = await axiosInstance.put(`/student/certificate/info`, {
      eventId: id,
      name: name,
      surname: surname,
      email: email,
      modifiedPdf: uploadedModifiedPdf,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const sendCertificate = async (id, file) => {
  try {
    const response = await axiosInstance.post(`/student/certificate`, {
      id: id,
      fileUrl: file,
    });
    return response;
  } catch (error) {
    return error;
  }
};
