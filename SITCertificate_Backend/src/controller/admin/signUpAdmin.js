import db from "../../db/connection.js";
import { hashedPassword } from "../auth/jwt.js";

const signUpAdmin = async (req, res) => {
  const { username, fullname, email, password } = req.body;
  try {
    if (!username || !fullname || !email || !password) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
    }
    const [users] = await db
      .promise()
      .query(`SELECT admin_email from admin where admin_email = ?`, [email]);

    if (users.length > 0) {
      return res.status(400).json({
        success: false,
        message: "อีเมลนี้มีผู้ใช้งานแล้ว",
      });
    }
    const hashed_password = hashedPassword(password);
    const values = [username, fullname, email, hashed_password];
    await db
      .promise()
      .query(
        "INSERT INTO admin (admin_username, admin_fullname, admin_email ,admin_password) VALUES (?, ?, ?, ?)",
        values
      );
    return res.status(201).json({ success: true, message: "สร้างบัญชีผู้ใช้สำเร็จ" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: error });
  }
};

export default signUpAdmin;
