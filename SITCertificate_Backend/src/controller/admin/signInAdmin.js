import db from "../../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SignInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const value = [email];
    const user = await db
      .promise()
      .query("SELECT * FROM admin WHERE admin_email = ?", [value]);
    if (user[0].length != 1) {
      throw "ไม่พบบัญชีนี้ในระบบ";
    }
    const compared = bcrypt.compareSync(password, user[0][0].admin_password);
    if (!compared) {
      throw "รหัสผ่านไม่ถูกต้อง";
    }
    const tokenData = {
      admin_id: user[0][0].admin_Id,
    };
    const signedToken = jwt.sign(tokenData, process.env.JWTSecretKey);
    res.cookie("adminToken", signedToken);
    return res.status(201).json({ message: "Login Successful" });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export default SignInAdmin;
