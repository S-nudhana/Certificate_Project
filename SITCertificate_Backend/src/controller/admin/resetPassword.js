import { transporter } from "../../config/transporter.config.js";
import db from "../../db/connection.js";
import { hashedPassword } from "../auth/jwt.js";
import { decryptPin } from "../../utils/crypto.js";

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
      const value2 = [hashed_password, email];
      await db
        .promise()
        .query(
          "UPDATE admin SET admin_password = ? WHERE admin_email = ?",
          value2
        );
      try {
        const response = await sendMail({
          to: email,
          subject: "แจ้งเตือนจาก SIT Certificate",
          text: "รหัสผ่านของคุณถูกเปลี่ยนแล้ว",
          html: `<p>รหัสผ่านของคุณถูกเปลี่ยนแล้ว</p>`,
        });
        return res.status(200).json(response);
      } catch (mailError) {
        console.error("Failed to send email", mailError);
        return res
          .status(500)
          .json({ message: "Password updated, but email failed to send" });
      }
    } else {
      return res.status(400).json({ message: "Invalid pin" });
    }
  } catch (error) {
    console.error("resetPassword error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default resetPassword;
