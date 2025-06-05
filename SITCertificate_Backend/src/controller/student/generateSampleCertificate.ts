import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { deleteFile } from '../deleteFile.js';
import { fetchAndFillCertificate } from "../../utils/watermark.js";
import db from "../../db/connection.js";

import type { StudentGenerateExample } from '../../types/student';

const generateExampleCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { eventId, name, surname }: StudentGenerateExample = req.body;
    const [rows] = await db.promise().query(
      "SELECT event_name, event_certificate, event_certificate_text_size, event_certificate_position_y FROM event WHERE event_id = ?",
      [eventId]
    ) as [any[], any];

    const eventData = rows[0];
    const fileName = `${eventData.event_name}_${name}_${surname}_certificate.pdf`;
    const filePath: string = eventData.event_certificate;
    const inputSize: number = eventData.event_certificate_text_size;
    const inputY: number = eventData.event_certificate_position_y;

    const pdfBytes: Buffer | null = await fetchAndFillCertificate(
      filePath,
      name,
      surname,
      inputY,
      inputSize,
      true
    );

    if (!pdfBytes) {
      res.status(500).json({ error: "Failed to generate PDF" });
      return;
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

  } catch (error) {
    console.error("Error adding watermark:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default generateExampleCertificate;
