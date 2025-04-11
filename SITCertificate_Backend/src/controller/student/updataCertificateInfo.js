import path from "path";
import fs from 'fs';
import { fetchAndFillCertificate } from "../../utils/watermark.js";
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
    const certificateQuery = await db
      .promise()
      .query(
        "SELECT event_name, event_certificate, event_certificate_text_size, event_certificate_position_y FROM event WHERE event_id = ?",
        [eventId]
      );
    const fileName = certificateQuery[0][0].event_name.concat(
      "_",
      name,
      "_",
      surname,
      "_certificate.pdf"
    );
    const filePath = certificateQuery[0][0].event_certificate;
    const inputSize = certificateQuery[0][0].event_certificate_text_size;
    const inputY = certificateQuery[0][0].event_certificate_position_y;
    const pdfBytes = await fetchAndFillCertificate(
      filePath,
      name,
      surname,
      inputY,
      inputSize,
      false
    );
    if (!pdfBytes) {
      return res.status(500).json({ error: "Failed to generate PDF" });
    }
    const dirPath = path.join("uploads", "upload_generatedCertificate");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const outputPath = path.join(dirPath, `${fileName}`);
    fs.writeFileSync(outputPath, pdfBytes);
    await db
      .promise()
      .query(
        "UPDATE student_event SET student_event_nameOnCertificate = ?, student_event_surnameOnCertificate = ?, student_event_mailToSendCertificate = ?, student_event_generatedCertificate = ? WHERE student_event_eventId = ? AND student_event_studentId = ?",
        [name, surname, email, outputPath, parseInt(eventId), studentId]
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

export default updataCertificateInformation;
