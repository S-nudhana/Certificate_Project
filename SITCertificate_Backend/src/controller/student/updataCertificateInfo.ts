import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import dotenv from "dotenv";
import db from "../../db/connection";
import { fetchAndFillCertificate } from "../../utils/watermark";
import { verifyToken } from "../auth/jwt.js";

dotenv.config();

interface CertificateRequestBody {
  eventId: string;
  name: string;
  surname: string;
  email: string;
  modifiedPdf?: string;
}

interface DecodedToken {
  id: number;
}

const updateCertificateInformation = async (
  req: Request<{}, {}, CertificateRequestBody>,
  res: Response
): Promise<void> => {
  const { eventId, name, surname, email } = req.body;
  const { token } = req.cookies;

  try {
    const userId = verifyToken(token) as unknown as DecodedToken;
    const studentId = userId.id;

    const [rows] = await db
      .promise()
      .query(
        "SELECT event_name, event_certificate, event_certificate_text_size, event_certificate_position_y FROM event WHERE event_id = ?",
        [eventId]
      );

    const eventData = (rows as any[])[0];
    const fileName = `${eventData.event_name}_${name}_${surname}_certificate.pdf`;
    const filePath = eventData.event_certificate;
    const inputSize = eventData.event_certificate_text_size;
    const inputY = eventData.event_certificate_position_y;

    const pdfBytes = await fetchAndFillCertificate(
      filePath,
      name,
      surname,
      inputY,
      inputSize,
      false
    );

    if (!pdfBytes) {
      res.status(500).json({ error: "Failed to generate PDF" });
      return;
    }

    const dirPath = path.join("uploads", "upload_generatedCertificate");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const outputPath = path.join(dirPath, fileName);
    fs.writeFileSync(outputPath, pdfBytes);

    await db
      .promise()
      .query(
        "UPDATE student_event SET student_event_nameOnCertificate = ?, student_event_surnameOnCertificate = ?, student_event_mailToSendCertificate = ?, student_event_generatedCertificate = ? WHERE student_event_eventId = ? AND student_event_studentId = ?",
        [name, surname, email, outputPath, parseInt(eventId), studentId]
      );

    res.status(200).json({
      success: true,
      message: "อัพเดทข้อมูลใบรับรองสำเร็จ",
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

export default updateCertificateInformation;
