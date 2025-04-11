import fs from 'fs';
import path from 'path';
import { deleteFile } from '../deleteFile.js';
import { fetchAndFillCertificate } from "../../utils/watermark.js";
import db from "../../db/connection.js";

const generateExampleCertificate = async (req, res) => {
  try {
    const { eventId, name, surname } = req.body;
    const certificateQuery = await db.promise().query(
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
    const pdfBytes = await fetchAndFillCertificate(filePath, name, surname , inputY, inputSize, true);

    if (!pdfBytes) {
      return res.status(500).json({ error: "Failed to generate PDF" });
    }

    const projectRoot = process.cwd();
    const dirPath = path.join(projectRoot, 'uploads', 'upload_temp');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const outputPath = path.join(dirPath, `example_${fileName}`);
    fs.writeFileSync(outputPath, pdfBytes);
    res.sendFile(`uploads/upload_temp/example_${fileName}`, { root: "./" }, (err) => {
      if (err) {
        console.error("Error sending file:", err);
      }
      deleteFile(`uploads/upload_temp/example_${fileName}`);
    });
    return;
  } catch (error) {
    console.error("Error adding watermark:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default generateExampleCertificate;
