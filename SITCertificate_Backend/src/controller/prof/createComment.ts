import { Request, Response } from "express";
import db from "../../db/connection.js";
import dotenv from "dotenv";
import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const setNewComment = async (req: Request, res: Response): Promise<void> => {
  const { eventId, detail } = req.body;
  const { token } = req.cookies;

  try {
    const userId = verifyToken(token);
    if (typeof userId !== "object" || !("professor_id" in userId)) {
      throw new Error("Invalid token payload");
    }
    const [rows] = await db
      .promise()
      .query(
        "SELECT professor_userName FROM professor WHERE professor_id = ?",
        [userId.professor_id]
      );

    const username = (rows as any)[0]?.professor_userName;
    const data = [eventId, username, detail, 0];

    await db
      .promise()
      .query(
        "INSERT INTO comment (comment_eventId, comment_username, comment_detail, comment_status) VALUES (?)",
        [data]
      );

    res.status(200).json({ success: true, message: "เพิ่มความคิดเห็นสำเร็จ" });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ success: false, message: "Internal server error" });
    return;
  }
};

export default setNewComment;
