import { Request, Response } from "express";
import db from "../../db/connection";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { verifyToken } from "../auth/jwt";
import { transporter } from "../../config/transporterConfig";

dotenv.config();

const sendCertificate = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  const { token } = req.cookies;

  try {
    const user = verifyToken(token);
    const studentId = typeof user !== "string" && user.id ? user.id : null;

    if (!studentId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const eventId = parseInt(id, 10);

    const [studentRows] = await db
      .promise()
      .query(
        `SELECT student_event_mailToSendCertificate, student_event_generatedCertificate FROM student_event WHERE student_event_eventId = ? AND student_event_studentId = ?`,
        [eventId, studentId]
      );

    const studentData = studentRows as {
      student_event_mailToSendCertificate: string;
      student_event_generatedCertificate: string;
    }[];

    if (studentData.length === 0) {
      res.status(404).json({ success: false, message: "ไม่พบข้อมูลผู้ใช้" });
      return;
    }

    const email = studentData[0].student_event_mailToSendCertificate;
    const generateCertificate =
      studentData[0].student_event_generatedCertificate;
    const decodedFilePath = decodeURI(generateCertificate);
    const filePath = path.resolve(decodedFilePath);
    const fileBuffer = fs.readFileSync(filePath);

    const [eventRows] = await db
      .promise()
      .query(
        `SELECT event_name, event_emailTemplate FROM event WHERE event_Id = ?`,
        [eventId]
      );

    const eventData = eventRows as {
      event_name: string;
      event_emailTemplate: string;
    }[];

    if (eventData.length === 0) {
      res.status(404).json({ success: false, message: "ไม่พบข้อมูลกิจกรรม" });
      return;
    }

    const eventName = eventData[0].event_name;
    const emailTemplate = eventData[0].event_emailTemplate;

    const mailOptions = {
      from: `"<No Reply> SITCertificate" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "แจ้งเตือนจาก SIT Certificate",
      text: `${emailTemplate}`,
      attachments: [
        {
          filename: `${eventName}.pdf`,
          content: fileBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ success: false, message: "ส่งอีเมลไม่สำเร็จ" });
      }
      return res.status(200).json({ success: true, message: "ส่งอีเมลสำเร็จ" });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

export default sendCertificate;
