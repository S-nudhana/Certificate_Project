import db from "../../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SignInProf = async (req, res) => {
  try {
    const { email, password } = req.body;
    const value = [email];
    const user = await db
      .promise()
      .query("SELECT * FROM professor WHERE professor_email = ?", [value]);
    if (user[0].length != 1) {
      throw "ไม่พบบัญชีนี้ในระบบ";
    }
    const compared = bcrypt.compareSync(password, user[0][0].professor_password);
    if (!compared) {
      throw "รหัสผ่านไม่ถูกต้อง";
    }
    const tokenData = {
      professor_id: user[0][0].professor_Id,
    };
    const signedToken = jwt.sign(tokenData, process.env.JWTSecretKey);
    res.cookie("profToken", signedToken);
    return res.status(201).json({ message: "Login Successful" });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export default SignInProf;
