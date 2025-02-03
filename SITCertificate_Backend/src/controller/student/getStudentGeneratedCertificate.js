import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const getStudentGeneratedCertificate = async (req, res) => {
  const eventId = parseInt(req.params.id);
  const { token } = req.cookies;
  try {
    const userId = verifyToken(token);
    const studentEmail = userId.student_email;
    const value = [eventId, studentEmail];
    const dataQuery = await db.promise().query(
      `SELECT s.student_GenerateCertificate
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
export default getStudentGeneratedCertificate;
