import db from "../../db/connection.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { verifyToken } from "../auth/jwt.js";
import { transporter } from "../../services/transporter.js";

dotenv.config();

const sendCertificate = async (req, res) => {
  const { id } = req.body;
  const { token } = req.cookies;
  try {
    const Id = verifyToken(token);
    const studentEmail = Id.student_email;
    const eventId = parseInt(id);
    const value = [eventId, studentEmail];
    const studentQuery = await db
      .promise()
      .query(
        `SELECT student_emailToSendCertificate, student_GenerateCertificate FROM student WHERE student_joinedEventId = ? AND student_email = ?`,
        value
      );
    const email = studentQuery[0][0].student_emailToSendCertificate;
    const generateCertificate = studentQuery[0][0].student_GenerateCertificate;
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
        return res.status(500).json({ message: "Failed to send email", error });
      }
      res.status(200).json({ message: "Email sent", info });
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      error: error.message,
    });
  }
};

export default sendCertificate;
