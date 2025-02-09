import db from "../../db/connection.js";

const getStatistics = async (req, res) => {
  const eventId = req.query.eventId;
  try {
    const participantsQuery = await db
      .promise()
      .query(`SELECT COUNT(*) AS participantsAmount FROM student_event WHERE student_event_eventId = ?`, [
        eventId,
      ]);
    const participantsAmount = parseInt(participantsQuery[0][0].participantsAmount);
    const participantsDownloadQuery = await db
      .promise()
      .query(
        `SELECT COUNT(*) AS participantsDownloadAmount FROM student_event WHERE student_event_eventId = ? AND student_event_eventCertificateGenerated = 1`,
        [eventId]
      );
    const participantsDownloadAmount = parseInt(participantsDownloadQuery[0][0].participantsDownloadAmount);
    return res.json({
      success: true,
      participantsAmount: participantsAmount,
      participantsDownloadAmount: participantsDownloadAmount,
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
export default getStatistics;
