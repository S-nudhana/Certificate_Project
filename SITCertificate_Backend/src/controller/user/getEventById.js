import db from "../../db/connection.js";

const getEventById = async (req, res) => {
  const id = req.query.id;
  try {
    const dataQuery = await db
      .promise()
      .query(`SELECT * FROM event WHERE event_Id = ?`, [id]);
    const data = dataQuery[0][0];
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
export default getEventById;
