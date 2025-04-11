import db from "../../db/connection.js";

const getInProgressEventById = async (req, res) => {
  const id = req.params.id;
  try {
    const eventsQuery = await db
      .promise()
      .query(
        `SELECT event_Id, event_name, event_startDate, event_endDate, event_thumbnail FROM event WHERE event_Id = ? AND event_startDate <= NOW() AND event_endDate >= NOW() AND event_approve = 1`,
        [id]
      );
    const events = eventsQuery[0][0];
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
export default getInProgressEventById;
