import { Request, Response } from "express";
import db from "../../db/connection.js";
import { sendMail } from "../../services/mail.js";
import { decryptPin } from "../../utils/crypto.js";

const sendResetPasswordEmail = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email;

  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT professor_forgotpasswordPin, professor_iv, professor_refCode FROM professor WHERE professor_email = ?",
        [email]
      ) as [Array<{ professor_forgotpasswordPin: string, professor_iv: string, professor_refCode: string }>, any];

    if (rows.length === 0) {
      res.status(404).json({ success: false, message: "ไม่พบอีเมลในระบบ" })
      return;
    }

    const professorResetPin = rows[0].professor_forgotpasswordPin;
    const iv = rows[0].professor_iv;
    const refCode = rows[0].professor_refCode;

    const decryptedPin = decryptPin(professorResetPin, iv);

    try {
      await sendMail({
        to: email,
        subject: "แจ้งเตือนจาก SIT Certificate",
        text: `รหัสยืนยันการเปลี่ยนรหัสผ่านของคุณคือ ${decryptedPin} รหัสอ้างอิง:${refCode}`,
        html: `<p>รหัสยืนยันการเปลี่ยนรหัสผ่านของคุณคือ <b>${decryptedPin}</b> <br> <br> รหัสอ้างอิง:<b>${refCode}</b></p>`,
      });
      res.status(200).json({ success: true, message: "ส่งอีเมลสำเร็จ" })
      return;
    } catch (mailError) {
      console.error("Failed to send email", mailError);
      res.status(500).json({ success: false, message: "ไม่สามารถส่งอีเมลยืนยันได้" })
      return;
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" })
    return;
  }
};

export default sendResetPasswordEmail;
