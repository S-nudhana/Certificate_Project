import db from "../../db/connection.js";

const getEventById = async (req, res) => {
  const id = req.params.id;
  try {
    const eventQuery = await db
      .promise()
      .query(`SELECT * FROM event WHERE event_Id = ?`, [id]);
    const event = eventQuery[0][0];
    const now = new Date();
    const statistic = event.event_endDate < now || event.event_approve === 1;
    return res.json({
      success: true,
      data: {
        event: event,
        statistic: statistic,
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
export default getEventById;
