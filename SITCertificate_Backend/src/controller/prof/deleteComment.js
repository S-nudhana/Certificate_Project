import db from "../../db/connection.js";

const deleteComment = async (req, res) => {
  const id = req.query.id;
  try {
    await db.promise().query(`DELETE FROM comment WHERE comment_Id = ?`, [id]);
    return res.json({
      success: true,
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
export default deleteComment;
