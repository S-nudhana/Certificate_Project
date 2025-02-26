import connection from "../../db/connection.js";
import { hashedPassword } from "../auth/jwt.js";

const CreateProf = async (req, res) => {
  const { username, fullname, email, password } = req.body;
  try {
    if (!username || !fullname || !email || !password) {
      return res
        .status(400)
        .json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
    }
    const users = await connection
      .promise()
      .query(`SELECT professor_email from professor where professor_email = ?`, [email]);

    if (users[0].length > 0) {
      return res.status(400).json({
        message: "อีเมลนี้มีผู้ใช้งานแล้ว",
      });
    }
    const hashed_password = hashedPassword(password);
    const values = [username, fullname, email, hashed_password];
    await connection.promise().query("INSERT INTO professor (professor_username, professor_fullname, professor_email ,professor_password) VALUES (?, ?, ?, ?)", values);
    return res.status(201).json({ success: true, message: "สร้างบัญชีผู้ใช้สำเร็จ" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: error });
  }
};

export default CreateProf;
