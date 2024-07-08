import db from "../../db/connection.js";

const getAllInProgressEvent = async (req,res) => {
  try {
    const dataQuery = await db
      .promise()
      .query(
        `SELECT * FROM event WHERE event_endDate > NOW() ORDER BY event_startDate DESC`
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
export default getAllInProgressEvent;
