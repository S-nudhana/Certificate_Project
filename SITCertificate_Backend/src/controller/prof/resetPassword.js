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
        "SELECT professor_forgotpasswordPin, professor_iv FROM professor WHERE professor_email = ? AND professor_refCode = ?",
        value
      );
    const professorResetPin = querry[0][0].professor_forgotpasswordPin;
    const iv = querry[0][0].professor_iv;
    const decryptedPin = decryptPin(professorResetPin, iv);
    if (decryptedPin === parseInt(pin, 10)) {
      const hashed_password = hashedPassword(password);
      const value2 = [hashed_password, email];
      await db
        .promise()
        .query(
          "UPDATE professor SET professor_password = ? WHERE professor_email = ?",
          value2
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
        console.error("Error: ", mailError);
        return res
          .status(500)
          .json({ success: false, message: "ไม่สามารถส่งอีเมลยืนยันได้" });
      }
    } else {
      return res.status(400).json({ success: false, message: "พินไม่ถูกต้อง" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: error });
  }
};
export default resetPassword;
