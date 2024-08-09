import axiosInstance from "../../utils/axiosInstance";

const putAdminUpdateEvent = async (eventName, eventOwnerName, openDate, closeDate, thumbnail, template, excel, eventId) => {
    const response = await axiosInstance.put(`/admin/updateEvent`, {
        eventName: eventName,
        eventOwner: eventOwnerName,
        openDate: openDate,
        closeDate: closeDate,
        thumbnail: uploadedThumbnailURL,
        template: uploadedTemplateURL,
        excel: uploadedExcelURL,
        eventId: id.id
      });
      return response;
}

export default putAdminUpdateEvent;