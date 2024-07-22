import db from "../../db/connection.js";

const updateEventData = async (req, res) => {
  const {eventName, eventOwner, openDate, closeDate, thumbnail, template, excel, eventId} = req.body;
  console.log(thumbnail)
  try {
    const dataQuery = await db
      .promise()
      .query(`SELECT event_thumbnail, event_certificate, event_excel FROM event WHERE event_Id = ?`, [eventId]);
    const data = dataQuery[0];
    if (!thumbnail) {
      thumbnail = data.event_thumbnail;
    }
    if (!template) {
      template = data.event_certificate;
    }
    if (!excel) {
      excel = data.event_excel;
    }
    const value = [eventName, eventOwner, openDate, closeDate, thumbnail, template, excel, eventId];
    await db
      .promise()
      .query(
        "UPDATE event SET event_name = ?, event_owner = ?, event_startDate = ?, event_endDate = ?, event_thumbnail = ?, event_certificate = ?, event_excel = ? WHERE event_Id = ?",
        [value]
      );
    return res.json({
      success: true,
      error: null,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      error: error.message,
    });
  }
};

export default updateEventData;
