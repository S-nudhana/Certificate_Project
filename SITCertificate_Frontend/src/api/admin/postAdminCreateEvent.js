import axiosInstance from "../../utils/axiosInstance";

const postAdminCreateEvent = async (
  eventName,
  eventOwnerName,
  openDate,
  closeDate,
  uploadedThumbnailURL,
  uploadedTemplateURL,
  uploadedExcelURL
) => {
  const response = await axiosInstance.post("/admin/createEvent", {
    eventName: eventName,
    eventOwner: eventOwnerName,
    openDate: openDate,
    closeDate: closeDate,
    thumbnail: uploadedThumbnailURL,
    template: uploadedTemplateURL,
    excel: uploadedExcelURL,
  });
  return response;
};

export default postAdminCreateEvent;
