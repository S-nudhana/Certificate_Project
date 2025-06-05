import { Request, Response } from "express";
import db from "../../db/connection";
import type { Event } from "../../types/user";

const getCommentById = async (req: Request, res: Response): Promise<void> => {
  const id = req.query.id;
  try {
    const dataQuery = await db
      .promise()
      .query(`SELECT * FROM comment WHERE comment_eventId = ?`, [id]);
    const data = dataQuery[0] as Event[];
    res.json({
      success: true,
      data: ({ comment: data }),
    });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
    return;
  }
};
export default getCommentById;
