import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const updataCertificateInformation = async (req, res) => {
  const { eventId, name, surname, email, modifiedPdf } = req.body;
  const { token } = req.cookies;
  try {
    const userId = verifyToken(token);
    const studentId = userId.id;
    await db
      .promise()
      .query(
        "UPDATE student_event SET student_event_nameOnCertificate = ?, student_event_surnameOnCertificate = ?, student_event_mailToSendCertificate = ?, student_event_generatedCertificate = ? WHERE student_event_eventId = ? AND student_event_studentId = ?",
        [name, surname, email, modifiedPdf, parseInt(eventId), studentId]
      );
    return res.status(200).json({
      success: true,
      message: "อัพเดทข้อมูลใบรับรองสำเร็จ",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export default updataCertificateInformation;
