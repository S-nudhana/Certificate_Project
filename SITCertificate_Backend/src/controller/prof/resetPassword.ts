import { Request, Response } from "express";
import db from "../../db/connection.js";
import { hashedPassword } from "../auth/jwt.js";
import { decryptPin } from "../../utils/crypto.js";
import { sendMail } from "../../services/mail.js";

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email, pin, password, refCode } = req.body;

  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT professor_forgotpasswordPin, professor_iv FROM professor WHERE professor_email = ? AND professor_refCode = ?",
        [email, refCode]
      ) as [Array<{ professor_forgotpasswordPin: string, professor_iv: string }>, any];

    if (rows.length === 0) {
      res.status(400).json({ success: false, message: "ไม่พบบัญชีหรือรหัสอ้างอิงไม่ถูกต้อง" })
      return;
    }

    const professorResetPin = rows[0].professor_forgotpasswordPin;
    const iv = rows[0].professor_iv;
    const decryptedPin = decryptPin(professorResetPin, iv);

    if (decryptedPin === parseInt(pin, 10)) {
      const hashed_password = hashedPassword(password);
      await db
        .promise()
        .query(
          "UPDATE professor SET professor_password = ?, professor_forgotPasswordPin = ?, professor_iv = ?, professor_refCode = ? WHERE professor_email = ?",
          [hashed_password, "", "", "", email]
        );

      try {
        await sendMail({
          to: email,
          subject: "แจ้งเตือนจาก SIT Certificate",
          text: "รหัสผ่านของคุณถูกเปลี่ยนแล้ว",
          html: `<p>รหัสผ่านของคุณถูกเปลี่ยนแล้ว</p>`,
        });
        res.status(200).json({ success: true, message: "เปลี่ยนรหัสผ่านสำเร็จ" })
        return;

      } catch (mailError) {
        console.error("Error sending email:", mailError);
        res.status(500).json({ success: false, message: "ไม่สามารถส่งอีเมลยืนยันได้" })
        return;
      }

    } else {
      res.status(400).json({ success: false, message: "พินไม่ถูกต้อง" })
      return;
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" })
    return;
  }
};

export default resetPassword;
