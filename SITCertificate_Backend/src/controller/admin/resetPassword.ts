import { Request, Response } from "express";
import db from "../../db/connection";
import { hashedPassword } from "../auth/jwt";
import { decryptPin } from "../../utils/crypto";
import { sendMail } from "../../services/mail";

interface Admin {
  admin_forgotpasswordPin: string;
  admin_iv: string;
}

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email, pin, password, refCode } = req.body;

  try {
    const value = [email, refCode];
    const [rows] = await db
      .promise()
      .query("SELECT admin_forgotpasswordPin, admin_iv FROM admin WHERE admin_email = ? AND admin_refCode = ?", value);

    const adminData = rows as Admin[];

    if (adminData.length === 0) {
      res.status(400).json({ success: false, message: "ไม่พบข้อมูลผู้ใช้งาน" });
      return;
    }

    const adminResetPin = adminData[0].admin_forgotpasswordPin;
    const iv = adminData[0].admin_iv;
    const decryptedPin = decryptPin(adminResetPin, iv);

    if (decryptedPin === parseInt(pin, 10)) {
      const hashed_password = hashedPassword(password);

      await db
        .promise()
        .query(
          "UPDATE admin SET admin_password = ?, admin_forgotPasswordPin = ?, admin_iv = ?, admin_refCode = ? WHERE admin_email = ?",
          [hashed_password, "", "", "", email]
        );

      try {
        await sendMail({
          to: email,
          subject: "แจ้งเตือนจาก SIT Certificate",
          text: "รหัสผ่านของคุณถูกเปลี่ยนแล้ว",
          html: `<p>รหัสผ่านของคุณถูกเปลี่ยนแล้ว</p>`,
        });
        res
          .status(200)
          .json({ success: true, message: "เปลี่ยนรหัสผ่านสำเร็จ" });
        return;
      } catch (mailError) {
        console.error("Failed to send email", mailError);
        res
          .status(500)
          .json({ success: true, message: "ไม่สามารถส่งอีเมลแจ้งเตือนได้" });
        return;
      }
    } else {
      res.status(400).json({ success: false, message: "รหัสยืนยันไม่ถูกต้อง" });
      return;
    }
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export default resetPassword;
