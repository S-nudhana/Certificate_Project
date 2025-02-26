import db from "../../db/connection.js";

const getStatistics = async (req, res) => {
  const eventId = req.query.eventId;
  try {
    const participantsAmountQuery = await db
      .promise()
      .query(
        `SELECT COUNT(*) AS participantsAmount FROM student_event WHERE student_event_eventId = ?`,
        [eventId]
      );
    const participantsAmount = parseInt(
      participantsAmountQuery[0][0].participantsAmount
    );
    const participantsDownloadAmountQuery = await db
      .promise()
      .query(
        `SELECT COUNT(*) AS participantsDownloadAmount FROM student_event WHERE student_event_eventId = ? AND student_event_eventCertificateGenerated = 1`,
        [eventId]
      );
    const participantsDownloadAmount = parseInt(
      participantsDownloadAmountQuery[0][0].participantsDownloadAmount
    );
    return res.json({
      success: true,
      data: {
        participantsAmount: participantsAmount,
        participantsDownloadAmount: participantsDownloadAmount,
      },
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      message: error,
    });
  }
};
export default getStatistics;
