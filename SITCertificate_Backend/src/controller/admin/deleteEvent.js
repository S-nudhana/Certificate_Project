import db from "../../db/connection.js";

import { deleteFile } from "../../middleware/deleteFile.js";

const deleteEvent = async (req, res) => {
  const id = req.query.id;
  try {
    const eventQuery = await db
      .promise()
      .query(
        `SELECT event_thumbnail, event_certificate, event_excel FROM event WHERE event_Id = ?`,
        [id]
      );
    const thumbnailPath = eventQuery[0][0].event_thumbnail;
    const certificatePath = eventQuery[0][0].event_certificate;
    const excelPath = eventQuery[0][0].event_excel;
    for (const filePath of [thumbnailPath, certificatePath, excelPath]) {
      if (filePath) {
        deleteFile(filePath);
      }
    }
    await db
      .promise()
      .query(`DELETE FROM comment WHERE comment_eventId = ?`, [id]);
    await db.promise().query(`DELETE FROM event WHERE event_Id = ?`, [id]);
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
export default deleteEvent;
