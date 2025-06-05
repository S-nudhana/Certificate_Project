import db from "../../db/connection";
import dotenv from "dotenv";
import { Request, Response } from "express";

import { verifyToken } from "../auth/jwt";
import { JwtPayload } from "jsonwebtoken";

dotenv.config();

const updateGenerateCertificate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const eventId: string = req.params.id;
  const { token } = req.cookies;
  try {
    const id = verifyToken(token);
    const studentId = (id as JwtPayload).id;
    await db
      .promise()
      .query(
        "UPDATE student_event SET student_event_eventCertificateGenerated = ? WHERE student_event_eventId = ? AND student_event_studentId = ?",
        [1, eventId, studentId]
      );
    res.status(200).json({
      success: true,
      message: "อัพเดทข้อมูลใบรับรองสำเร็จ",
    });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

export default updateGenerateCertificate;
