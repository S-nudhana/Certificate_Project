import fs from 'fs';
import path from 'path';
import { deleteFile } from '../deleteFile.js';
import { sampleSetNameOnCertificate } from "../../utils/watermark.js";

const embedName = async (req, res) => {
  try {
    const pdfFile = req.file;
    const { inputSize, inputY } = req.body;

    if (!pdfFile) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = pdfFile.path;
    const pdfBytes = await sampleSetNameOnCertificate(filePath, inputSize, inputY);

    if (!pdfBytes) {
      return res.status(500).json({ error: "Failed to generate PDF" });
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
