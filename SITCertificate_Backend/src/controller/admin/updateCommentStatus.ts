import { Request, Response } from "express";
import db from "../../db/connection";

const updateCommentStatus = async (req: Request, res: Response): Promise<void> => {
  const commentId: number = parseInt(req.params.id);
  try {
    const [rows] = await db
      .promise()
      .query("SELECT comment_status FROM comment WHERE comment_Id = ?", [commentId]);

    const data = rows as { comment_status: number }[];

    const newCommentStatus = !data[0].comment_status;

    await db
      .promise()
      .query("UPDATE comment SET comment_status = ? WHERE comment_Id = ?", [
        newCommentStatus,
        commentId,
      ]);

    res.status(200).json({
      success: true,
      data: {
        commentStatus: newCommentStatus,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export default updateCommentStatus;
