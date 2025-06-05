import { Request, Response } from "express";
import db from "../../db/connection";
import { encryptPin } from "../../utils/crypto";

const setPinForgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const email = req.body.email;

  try {
    const [rows] = (await db
      .promise()
      .query(
        "SELECT EXISTS(SELECT 1 FROM professor WHERE professor_email = ?) AS existsResult",
        [email]
      )) as [Array<{ existsResult: number }>, any];

    const exists = rows[0]?.existsResult === 1;

    if (!exists) {
      res.status(400).json({ message: "ไม่พบอีเมลของท่านในระบบ" });
      return;
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
    res.status(200).json({
      success: true,
      message: "ส่งรหัสการเปลี่ยนรหัสผ่านไปในอีเมลของท่านเรียบร้อยแล้ว",
      data: {
        refCode: refCode,
      },
    });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export default setPinForgotPassword;
