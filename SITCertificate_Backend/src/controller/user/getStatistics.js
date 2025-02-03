import db from "../../db/connection.js";

const getStatistics = async (req, res) => {
  const eventId = req.query.eventId;
  try {
    const participantsQuery = await db
      .promise()
      .query(`SELECT COUNT(*) AS participantsAmount FROM student WHERE student_joinedEventId = ?`, [
        eventId,
      ]);
    const participantsAmount = parseInt(participantsQuery[0][0].participantsAmount);
    const participantsDownloadQuery = await db
      .promise()
      .query(
        `SELECT COUNT(*) AS participantsDownloadAmount FROM student WHERE student_joinedEventId = ? AND student_eventGenerated = 1`,
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
