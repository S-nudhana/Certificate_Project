import db from "../../db/connection";
import dotenv from "dotenv";
import { Request, Response } from "express";

import { verifyToken } from "../auth/jwt";

dotenv.config();

interface DecodedToken {
  id: number;
}

const updateGenerateCertificate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const eventId = parseInt(req.params.id);
  const { token } = req.cookies;
  try {
    const userId = verifyToken(token) as unknown as DecodedToken;
    const studentId = userId.id;
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
