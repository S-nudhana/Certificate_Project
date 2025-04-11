import db from "../../db/connection.js";

import { sendMail } from "../../services/mail.js";
import { decryptPin } from "../../utils/crypto.js";

const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const value = [email];
    const querry = await db
      .promise()
      .query(
        "SELECT professor_forgotpasswordPin, professor_iv, professor_refCode FROM professor WHERE professor_email = ?",
        value
      );
    const professorResetPin = querry[0][0].professor_forgotpasswordPin;
    const iv = querry[0][0].professor_iv;
    const refCode = querry[0][0].professor_refCode;
    const decryptedPin = decryptPin(professorResetPin, iv);
    try {
      await sendMail({
        to: email,
        subject: "แจ้งเตือนจาก SIT Certificate",
        text: `รหัสยืนยันการเปลี่ยนรหัสผ่านของคุณคือ ${decryptedPin} รหัสอ้างอิง:${refCode}`,
        html: `<p>รหัสยืนยันการเปลี่ยนรหัสผ่านของคุณคือ <b>${decryptedPin}</b> <br> <br> รหัสอ้างอิง:<b>${refCode}</b></p>`,
      });
      return res.status(200).json({ success: true, message: "ส่งอีเมลสำเร็จ" });
    } catch (mailError) {
      console.error("Failed to send email", mailError);
      return res
        .status(500)
        .json({ success: false, message: "ไม่สามารถส่งอีเมลยืนยันได้" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default sendResetPasswordEmail;
