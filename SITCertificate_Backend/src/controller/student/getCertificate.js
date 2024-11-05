import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const getCertificate = async (req, res) => {
  const eventId = parseInt(req.query.id);
  try {
    const { token } = req.cookies;
    const userId = verifyToken(token);
    const studentEmail = userId.student_email;
    const value = [eventId, studentEmail];
    const dataQuery = await db.promise().query(
      `SELECT e.event_Certificate, e.event_name, s.student_nameOnCertificate, s.student_surnameOnCertificate, s.student_emailToSendCertificate, s.student_GenerateCertificate
      ,e.event_certificate_position_y, e.event_certificate_text_size
     FROM event e
     JOIN student s ON e.event_Id = s.student_joinedEventId 
     WHERE e.event_Id = ? AND s.student_email = ?`,
      value
    );
    const data = dataQuery[0][0];
    return res.status(200).json({
      success: true,
      data: data,
      error: null,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      error: error.message,
    });
  }
};
export default getCertificate;
