import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const getCertificate = async (req, res) => {
  const eventId = parseInt(req.params.id);
  const { token } = req.cookies;
  try {
    const userId = verifyToken(token);
    const studentId = userId.id;
    const certificateQuery = await db.promise().query(
      `SELECT e.event_Certificate, e.event_name, se.student_event_nameOnCertificate, se.student_event_surnameOnCertificate, se.student_event_mailToSendCertificate, se.student_event_generatedCertificate, e.event_certificate_position_y, e.event_certificate_text_size
      FROM event AS e, student_event AS se
      WHERE e.event_Id = se.student_event_eventId AND e.event_Id = ? AND se.student_event_studentId = ?`,
      [eventId, studentId]
    );
    const certificate = certificateQuery[0][0];
    return res.status(200).json({
      success: true,
      data: {
        certificate: certificate,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export default getCertificate;
