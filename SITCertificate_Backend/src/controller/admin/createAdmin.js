import connection from "../../db/connection.js";
import { hashedPassword } from "../auth/jwt.js";

const createAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
    }

    const [users] = await connection
      .promise()
      .query(`SELECT admin_email from admin where admin_email = ?`, [email]);

    if (users.length > 0) {
      return res.status(400).json({
        message: "อีเมลนี้มีผู้ใช้งานแล้ว",
      });
    }
    const hashed_password = hashedPassword(password);
    const values = [username, email, hashed_password];
    await connection
      .promise()
      .query(
        "INSERT INTO admin (admin_userName, admin_email ,admin_password) VALUES (?, ?, ?)",
        values
      );
    return res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
};

export default createAdmin;
