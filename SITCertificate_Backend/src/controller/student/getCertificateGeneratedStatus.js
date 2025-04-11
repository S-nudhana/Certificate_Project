import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const getCertificateGeneratedStatus = async (req, res) => {
  const eventId = parseInt(req.params.id);
  const { token } = req.cookies;
  try {
    const userId = verifyToken(token);
    const studentEmail = userId.student_email;
    const value = [eventId, studentEmail];
    const dataQuery = await db
      .promise()
      .query(
        `SELECT se.student_event_eventCertificateGenerated FROM student_event AS se, student AS s WHERE s.student_Id = se.student_event_studentId AND se.student_event_eventId = ? AND s.student_email = ?`,
        value
      );
    const status = dataQuery[0][0].student_event_eventCertificateGenerated;
    if (status === 1) {
      return res.json({
        success: true,
        data: {
          status: false,
        },
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        status: true,
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
export default getCertificateGeneratedStatus;
