import db from "../../db/connection.js";
import { encryptPin } from "../../utils/crypto.js";

const setPinForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const value = [email];
    const [rows] = await db
      .promise()
      .query(
        "SELECT EXISTS(SELECT 1 FROM professor WHERE professor_email = ?) AS existsResult",
        [value]
      );
    const exists = rows[0]?.existsResult === 1;
    if (!exists) {
      return res.status(400).json({ message: "ไม่พบอีเมลของท่านในระบบ" });
    }
    const pin = Math.floor(100000 + Math.random() * 900000);
    const refCode = Math.floor(100000 + Math.random() * 900000);
    const encrypt = encryptPin(pin);
    const pinEncrypt = encrypt.encryptedData;
    const iv = encrypt.iv;
    const value2 = [pinEncrypt, iv, refCode, email];
    await db
      .promise()
      .query(
        "UPDATE professor SET professor_forgotpasswordPin = ?, professor_iv = ?, professor_refCode = ? WHERE professor_email = ?",
        value2
      );
    return res.status(200).json({
      success: true,
      message: "ส่งรหัสการเปลี่ยนรหัสผ่านไปในอีเมลของท่านเรียบร้อยแล้ว",
      data: {
        refCode: refCode,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: error });
  }
};
export default setPinForgotPassword;
