import { transporter } from "../../config/transporterConfig.js";
import dotenv from "dotenv";
import db from "../../db/connection.js";

import { verifyToken } from "../auth/jwt.js";
import { sendMail } from "../../services/mail.js";

dotenv.config();

const sendEmail = async (req, res) => {
  const { id, subject, eventName, commentDetail } = req.body;
  const { token } = req.cookies;
  try {
    const Id = verifyToken(token);
    const profId = parseInt(Id.professor_id);
    const dataQuery = await db
      .promise()
      .query(
        `SELECT admin_email FROM admin WHERE admin_Id IN (SELECT event_adminId from event WHERE event_Id = ?)`,
        [parseInt(id)]
      );
    const reciever = dataQuery[0][0].admin_email;
    const senderQuery = await db
      .promise()
      .query(
        `SELECT professor_userName FROM professor WHERE professor_Id = ?`,
        [profId]
      );
    const sender = senderQuery[0][0].professor_userName;
    try {
      await sendMail({
        to: reciever,
        subject: subject,
        text: `อาจารย์ ${sender} ได้เพิ่มความคิดเห็นใหม่ ${commentDetail} ในกิจกรรม ${eventName}`,
        html: `<p>อาจารย์ ${sender} ได้เพิ่มความคิดเห็นใหม่ ${commentDetail} ในกิจกรรม ${eventName}</p>`,
      });
      return res.status(200).json({ success: true, message: "ส่งอีเมลสำเร็จ" });
    } catch (mailError) {
      console.error("Error: ", mailError);
      return res
        .status(500)
        .json({ success: false, message: "ไม่สามารถส่งอีเมลยืนยันได้" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
export default sendEmail;
