import db from "../../db/connection.js";

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    await db.promise().query(`DELETE FROM comment WHERE comment_Id = ?`, [commentId]);
    return res.json({
      success: true,
      message: "ลบความคิดเห็นสำเร็จ",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export default deleteComment;
