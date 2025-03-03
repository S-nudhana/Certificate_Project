import db from "../../db/connection.js";
import { hashedPassword } from "../auth/jwt.js";
import { decryptPin } from "../../utils/crypto.js";
import { sendMail } from "../../services/mail.js";

const resetPassword = async (req, res) => {
  const { email, pin, password, refCode } = req.body;
  try {
    const value = [email, refCode];
    const querry = await db
      .promise()
      .query(
        "SELECT admin_forgotpasswordPin, admin_iv FROM admin WHERE admin_email = ? AND admin_refCode = ?",
        value
      );
    const adminResetPin = querry[0][0].admin_forgotpasswordPin;
    const iv = querry[0][0].admin_iv;
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
        return res
          .status(200)
          .json({ success: true, message: "เปลี่ยนรหัสผ่านสำเร็จ" });
      } catch (mailError) {
        console.error("Failed to send email", mailError);
        return res
          .status(500)
          .json({ success: true, message: "ไม่สามารถส่งอีเมลแจ้งเตือนได้" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "รหัสยืนยันไม่ถูกต้อง" });
    }
  } catch (error) {
    console.error("Error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export default resetPassword;
