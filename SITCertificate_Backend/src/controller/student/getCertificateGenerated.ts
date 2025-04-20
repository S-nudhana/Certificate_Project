import { Request, Response } from "express";
import db from "../../db/connection";
import dotenv from "dotenv";
import { verifyToken } from "../auth/jwt";

dotenv.config();

interface StudentEvent {
  student_event_generatedCertificate: boolean;
}

const getCertificateGenerated = async (
  req: Request,
  res: Response
): Promise<void> => {
  const eventId = req.params.id;
  const { token } = req.cookies;

  try {
    const userId = verifyToken(token);
    const studentId = userId.id;
    const certificateQuery = await db.promise().query(
      `SELECT student_event_generatedCertificate
      FROM student_event
      WHERE student_event_eventId = ? AND student_event_studentId = ?`,
      [eventId, studentId]
    );

    const certificate = (certificateQuery[0] as StudentEvent[])[0]
      ?.student_event_generatedCertificate;
    res.status(200).json({
      success: true,
      data: {
        certificate: certificate,
      },
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

export default getCertificateGenerated;
