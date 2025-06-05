import { Request, Response } from "express";
import db from "../../db/connection";
import { encryptPin } from "../../utils/crypto";

const setPinForgotPassword = async (req: Request, res: Response): Promise<void> => {
  const email: string = req.body.email;

  try {
    const [rows]: any = await db
      .promise()
      .query(
        "SELECT EXISTS(SELECT 1 FROM admin WHERE admin_email = ?) AS existsResult",
        [email]
      );

    const exists = (rows as Array<{ existsResult: number }>)[0].existsResult === 1;
    if (!exists) {
      res.status(400).json({ message: "ไม่พบอีเมลของท่านในระบบ" });
      return;
    }

    const pin = Math.floor(100000 + Math.random() * 900000);
    const refCode = Math.floor(100000 + Math.random() * 900000);

    const { encryptedData: pinEncrypt, iv } = encryptPin(pin);
    const value2 = [pinEncrypt, iv, refCode, email];

    await db
      .promise()
      .query(
        "UPDATE admin SET admin_forgotpasswordPin = ?, admin_iv = ?, admin_refCode = ? WHERE admin_email = ?",
        value2
      );

    res.status(200).json({
      success: true,
      message: "ส่งรหัสการเปลี่ยนรหัสผ่านไปในอีเมลของท่านเรียบร้อยแล้ว",
      data: {
        refCode,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default setPinForgotPassword;
