import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { deleteFile } from '../deleteFile';
import { sampleSetNameOnCertificate } from "../../utils/watermark";

const embedName = async (req: Request, res: Response): Promise<void> => {
  try {
    const pdfFile = req.file;
    const { inputSize, inputY } = req.body;

    if (!pdfFile) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const filePath = pdfFile.path;
    const pdfBytes = await sampleSetNameOnCertificate(filePath, inputSize, inputY);

    if (!pdfBytes) {
      res.status(500).json({ error: "Failed to generate PDF" });
      return;
    }

    const projectRoot = process.cwd();
    const dirPath = path.join(projectRoot, 'uploads', 'upload_temp');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const outputPath = path.join(dirPath, `embedname_${pdfFile.filename}`);
    fs.writeFileSync(outputPath, pdfBytes);
    deleteFile(filePath);

    res.sendFile(`uploads/upload_temp/embedname_${pdfFile.filename}`, { root: "./" }, (err) => {
      if (err) {
        console.error("Error sending file:", err);
      }
      deleteFile(`uploads/upload_temp/embedname_${pdfFile.filename}`);
    });
    return;
  } catch (error) {
    console.error("Error adding watermark:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default embedName;
