import { Request, Response } from "express";
import db from "../../db/connection";

const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const commentId = req.params.id;

  try {
    await db.promise().query(`DELETE FROM comment WHERE comment_Id = ?`, [commentId]);

    res.json({
      success: true,
      message: "ลบความคิดเห็นสำเร็จ",
    });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
    return;
  }
};

export default deleteComment;
