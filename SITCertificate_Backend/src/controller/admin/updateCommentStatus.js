import db from "../../db/connection.js";
const updateCommentStatus = async (req, res) => {
  const commentId = req.params.id;
  try {
    const dataQuery = await db
      .promise()
      .query(`SELECT comment_status FROM comment WHERE comment_Id = ?`, [
        commentId,
      ]);
    const data = dataQuery[0];
    const newCommentStatus = !data[0].comment_status;
    await db
      .promise()
      .query("UPDATE comment SET comment_status = ? WHERE comment_Id = ?", [
        newCommentStatus,
        commentId,
      ]);
    return res.status(200).json({
      success: true,
      data: {
        commentStatus: newCommentStatus,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
export default updateCommentStatus;
