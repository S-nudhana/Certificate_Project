import db from "../../db/connection.js";

const getHistoryEvent = async (req, res) => {
  const eventName = req.query.eventName;
  try {
    const eventsQuery = await db
      .promise()
      .query(
        `SELECT * FROM event WHERE event_endDate < NOW() AND event_name LIKE ? ORDER BY event_startDate`,
        [`%${eventName}%`]
      );
    const events = eventsQuery[0];
    return res.json({
      success: true,
      data: {
        history: events,
      },
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
export default getHistoryEvent;
