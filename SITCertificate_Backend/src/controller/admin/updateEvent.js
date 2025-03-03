import db from "../../db/connection.js";

import { deleteFile } from "../deleteFile.js";

const updateEventData = async (req, res) => {
  let {
    eventName,
    eventOwner,
    openDate,
    closeDate,
    thumbnail,
    template,
    excel,
    emailTemplate,
    inputSize,
    inputY,
    eventId,
  } = req.body;
  try {
    const dataQuery = await db
      .promise()
      .query(
        `SELECT event_thumbnail, event_certificate, event_excel FROM event WHERE event_Id = ?`,
        [eventId]
      );
    const data = dataQuery[0][0];
    if (!thumbnail) {
      thumbnail = data.event_thumbnail;
    } else {
      deleteFile(data.event_thumbnail);
    }
    if (!template) {
      template = data.event_certificate;
    } else {
      deleteFile(data.event_certificate);
    }
    if (!excel) {
      excel = data.event_excel;
    } else {
      deleteFile(data.event_excel);
    }
    await db
      .promise()
      .query(
        "UPDATE event SET event_name = ?, event_owner = ?, event_startDate = ?, event_endDate = ?, event_thumbnail = ?, event_certificate = ?, event_excel = ?, event_emailTemplate = ?, event_certificate_text_size = ?, event_certificate_position_y = ? WHERE event_Id = ?",
        [
          eventName,
          eventOwner,
          openDate,
          closeDate,
          thumbnail,
          template,
          excel,
          emailTemplate,
          inputSize,
          inputY,
          eventId,
        ]
      );
    return res.status(200).json({
      success: true,
      message: "อัพเดทกิจกรรมสำเร็จ",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export default updateEventData;
