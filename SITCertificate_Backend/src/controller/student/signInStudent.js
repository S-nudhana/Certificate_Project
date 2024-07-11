import connection from "../../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SignInStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw "Missing Required Fields";
    const query = "select * from student where student_email = ?";
    const value = [email];
    const user = await connection.promise().query(query, value);
    if (user[0].length != 1) throw "ไม่พบบัญชีนี้ในระบบ";
    function compared(password, storedPassword) {
      return password === storedPassword;
    }
    const storedPassword = user[0][0].student_password;
    if (!compared(password, storedPassword)) {
      throw "รหัสผ่านไม่ถูกต้อง";
    }
    const tokenData = {
      student_id: user[0][0].student_id,
    };
    const signedToken = jwt.sign(tokenData, process.env.JWTSecretKey);
    res.cookie("token", signedToken, {
      httpOnly: true,
    });
    return res.status(201).json({ message: "Login Successful" });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export default SignInStudent;
