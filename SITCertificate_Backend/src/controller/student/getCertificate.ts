import { Request, Response } from "express";
import db from "../../db/connection";
import dotenv from "dotenv";
import { verifyToken } from "../auth/jwt";
import type { Certificate } from "../../types/student";
import { JwtPayload } from "jsonwebtoken";

dotenv.config();

const getCertificate = async (req: Request, res: Response): Promise<void> => {
  const eventId: string = req.params.id;
  const { token } = req.cookies;

  try {
    const id = verifyToken(token);
    const studentId = (id as JwtPayload).id;

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
      WHERE e.event_id = se.student_event_eventId AND e.event_id = ? AND se.student_event_studentId = ?`,
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
