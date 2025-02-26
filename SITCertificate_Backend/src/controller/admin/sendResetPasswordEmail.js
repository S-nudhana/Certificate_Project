import db from "../../db/connection.js";
import { decryptPin } from "../../utils/crypto.js";
import { sendMail } from "../../services/mail.js";

const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const value = [email];
    const querry = await db
      .promise()
      .query(
        "SELECT admin_forgotpasswordPin, admin_iv, admin_refCode FROM admin WHERE admin_email = ?",
        value
      );
    const adminResetPin = querry[0][0].admin_forgotpasswordPin;
    const iv = querry[0][0].admin_iv;
    const refCode = querry[0][0].admin_refCode;
    const decryptedPin = decryptPin(adminResetPin, iv);
    try {
      await sendMail({
        to: email,
        subject: "แจ้งเตือนจาก SIT Certificate",
        text: `รหัสยืนยันการเปลี่ยนรหัสผ่านของคุณคือ ${decryptedPin} รหัสอ้างอิง:${refCode}`,
        html: `<p>รหัสยืนยันการเปลี่ยนรหัสผ่านของคุณคือ <b>${decryptedPin}</b> <br> <br> รหัสอ้างอิง:<b>${refCode}</b></p>`,
      });
      return res
        .status(200)
        .json({ success: true, message: "ส่งอีเมลแจ้งเตือนสำเร็จ" });
    } catch (mailError) {
      console.error("Error: ", mailError);
      return res
        .status(500)
        .json({ success: false, message: "ส่งอีเมลแจ้งเตือนไม่สำเร็จ" });
    }
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ success: false, message: error });
  }
};
export default sendResetPasswordEmail;
