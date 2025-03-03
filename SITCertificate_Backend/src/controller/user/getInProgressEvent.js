import db from "../../db/connection.js";

const getInProgressEvent = async (req, res) => {
  try {
    const eventsQuery = await db
      .promise()
      .query(
        `SELECT * FROM event WHERE event_endDate > NOW() ORDER BY event_startDate DESC`
      );
    const events = eventsQuery[0];
    return res.json({
      success: true,
      data: {
        events: events,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export default getInProgressEvent;
