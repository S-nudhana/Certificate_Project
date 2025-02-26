import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const getCertificateGenerated = async (req, res) => {
  const eventId = parseInt(req.params.id);
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
    const certificate = certificateQuery[0][0].student_event_generatedCertificate;
    return res.status(200).json({
      success: true,
      data: {
        certificate: certificate,
      },
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
export default getCertificateGenerated;
