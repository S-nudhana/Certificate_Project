import { Request, Response } from "express";
import db from "../../db/connection.js";
import { decryptPin } from "../../utils/crypto";
import { sendMail } from "../../services/mail";

interface Admin {
  admin_forgotpasswordPin: string;
  admin_iv: string;
  admin_refCode: string;
}

const sendResetPasswordEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  try {
    const value = [email];
    const [rows] = await db
      .promise()
      .query("SELECT admin_forgotpasswordPin, admin_iv, admin_refCode FROM admin WHERE admin_email = ?", value);
    const adminData = rows as Admin[];
    if (adminData.length === 0) {
      res.status(400).json({ success: false, message: "ข้อมูลไม่ครบถ้วน" });
      return;
    }

    const { admin_forgotpasswordPin, admin_iv, admin_refCode } = adminData[0];
    const decryptedPin = decryptPin(admin_forgotpasswordPin, admin_iv);

    try {
      await sendMail({
        to: email,
        subject: "แจ้งเตือนจาก SIT Certificate",
        text: `รหัสยืนยันการเปลี่ยนรหัสผ่านของคุณคือ ${decryptedPin} รหัสอ้างอิง:${admin_refCode}`,
        html: `<p>รหัสยืนยันการเปลี่ยนรหัสผ่านของคุณคือ <b>${decryptedPin}</b> <br> <br> รหัสอ้างอิง:<b>${admin_refCode}</b></p>`,
      });
      res.status(200).json({ success: true, message: "ส่งอีเมลแจ้งเตือนสำเร็จ" });
      return;
    } catch (mailError) {
      console.error("Error: ", mailError);
      res.status(500).json({ success: false, message: "ส่งอีเมลแจ้งเตือนไม่สำเร็จ" });
      return;
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export default sendResetPasswordEmail;
