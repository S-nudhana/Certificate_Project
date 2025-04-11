import db from "../../db/connection.js";

const getCommentById = async (req, res) => {
  const id = req.query.id;
  try {
    const dataQuery = await db
      .promise()
      .query(`SELECT * FROM comment WHERE comment_eventId = ?`, [id]);
    const data = dataQuery[0]
    return res.json({
      success: true,
      data: ({comment: data}),
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export default getCommentById;
