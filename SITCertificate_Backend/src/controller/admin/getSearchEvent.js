import db from "../../db/connection.js";

const getSearchEvent = async (req, res) => {
  const eventName = req.query.eventName;
  try {
    const dataQuery = await db
      .promise()
      .query(
        `SELECT * FROM event WHERE event_name LIKE ? ORDER BY event_startDate`,
        [`%${eventName}%`]
      );
    const data = dataQuery[0];
    console.log(data);
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
export default getSearchEvent;
