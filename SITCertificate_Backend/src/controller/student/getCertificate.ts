import { Request, Response } from "express";
import db from "../../db/connection";
import dotenv from "dotenv";
import { verifyToken } from "../auth/jwt";

dotenv.config();

interface Certificate {
  event_Certificate: string;
  event_name: string;
  student_event_nameOnCertificate: string;
  student_event_surnameOnCertificate: string;
  student_event_mailToSendCertificate: string;
  student_event_generatedCertificate: boolean;
  event_certificate_position_y: number;
  event_certificate_text_size: number;
}

const getCertificate = async (req: Request, res: Response): Promise<void> => {
  const eventId = parseInt(req.params.id);
  const { token } = req.cookies;

  try {
    const userId = verifyToken(token);
    const studentId = typeof userId === "object" && "id" in userId ? userId.id : null;

    if (!studentId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
      return;
    }
    const [certificateQuery] = await db.promise().query(
      `SELECT e.event_Certificate, e.event_name, se.student_event_nameOnCertificate, se.student_event_surnameOnCertificate, se.student_event_mailToSendCertificate, se.student_event_generatedCertificate, e.event_certificate_position_y, e.event_certificate_text_size
      FROM event AS e, student_event AS se
      WHERE e.event_Id = se.student_event_eventId AND e.event_Id = ? AND se.student_event_studentId = ?`,
      [eventId, studentId]
    );

    const certificate = certificateQuery as Certificate[];
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

export default getCertificate;
