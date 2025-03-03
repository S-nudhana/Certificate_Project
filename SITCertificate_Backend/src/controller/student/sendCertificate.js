import db from "../../db/connection.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { verifyToken } from "../auth/jwt.js";
import { transporter } from "../../config/transporterConfig.js";

dotenv.config();

const sendCertificate = async (req, res) => {
  const { id } = req.body;
  const { token } = req.cookies;
  try {
    const user = verifyToken(token);
    const studentId = user.id;
    const eventId = parseInt(id);
    const studentQuery = await db
      .promise()
      .query(
        `SELECT student_event_mailToSendCertificate, student_event_generatedCertificate FROM student_event WHERE student_event_eventId = ? AND student_event_studentId = ?`,
        [eventId, studentId]
      );
    const email = studentQuery[0][0].student_event_mailToSendCertificate;
    const generateCertificate = studentQuery[0][0].student_event_generatedCertificate;
    const decodedFilePath = decodeURI(generateCertificate);
    const filePath = path.resolve(decodedFilePath);
    const fileBuffer = fs.readFileSync(filePath);
    const eventQuery = await db
      .promise()
      .query(
        `SELECT event_name, event_emailTemplate FROM event WHERE event_Id = ?`,
        [eventId]
      );
    const eventName = eventQuery[0][0].event_name;
    const emailTemplate = eventQuery[0][0].event_emailTemplate;
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
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default sendCertificate;
