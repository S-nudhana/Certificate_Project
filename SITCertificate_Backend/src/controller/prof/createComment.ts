import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import db from "../../db/connection.js";
import dotenv from "dotenv";
import { verifyToken } from "../auth/jwt.js";

import type { ProfCreateComment } from "../../types/prof.js";

dotenv.config();

const setNewComment = async (req: Request, res: Response): Promise<void> => {
  const { eventId, detail }: ProfCreateComment = req.body;
  const { token } = req.cookies;

  try {
    const id = verifyToken(token);
    const userId = (id as JwtPayload).professor_id;
    const [rows] = await db
      .promise()
      .query(
        "SELECT professor_userName FROM professor WHERE professor_id = ?",
        [userId]
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
