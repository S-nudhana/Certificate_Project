import db from "../../db/connection.js";

const getSearchEvent = async (req, res) => {
  const eventName = req.query.eventName;
  try {
    const dataQuery = await db
      .promise()
      .query(
        `SELECT * FROM event WHERE event_name LIKE ? AND event_endDate > NOW() ORDER BY event_startDate`,
        [`%${eventName}%`]
      );
    const data = dataQuery[0];
    return res.json({
      success: true,
      data: {
        events: data,
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
export default getSearchEvent;
