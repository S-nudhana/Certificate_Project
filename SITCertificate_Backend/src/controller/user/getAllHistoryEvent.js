import db from "../../db/connection.js";

const getAllHistoryEvent = async (req, res) => {
  const eventName = req.query.eventName;
  try {
    const dataQuery = await db
      .promise()
      .query(
        `SELECT * FROM event WHERE event_endDate < NOW() AND event_name LIKE ? ORDER BY event_startDate`,
        [`%${eventName}%`]
      );
    const data = dataQuery[0];
    return res.json({
      success: true,
      data: data,
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
export default getAllHistoryEvent;
