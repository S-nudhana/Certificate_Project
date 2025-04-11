import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const updateGenerateCertificate = async (req, res) => {
  const eventId = parseInt(req.params.id);
  const { token } = req.cookies;
  try {
    const userId = verifyToken(token);
    const studentId = userId.id;
    await db
      .promise()
      .query(
        "UPDATE student_event SET student_event_eventCertificateGenerated = ? WHERE student_event_eventId = ? AND student_event_studentId = ?",
        [1, eventId, studentId]
      );
    return res.status(200).json({
      success: true,
      message: "อัพเดทข้อมูลใบรับรองสำเร็จ",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default updateGenerateCertificate;
