import db from "../../db/connection.js";
import { compare, signToken } from "../auth/jwt.js";

const SignInProf = async (req, res) => {
  try {
    const { email, password } = req.body;
    const value = [email];
    const user = await db
      .promise()
      .query("SELECT professor_Id, professor_password FROM professor WHERE professor_email = ?", [value]);
    if (user[0].length != 1) {
      throw "ไม่พบบัญชีนี้ในระบบ";
    }
    const compared = compare(password, user[0][0].professor_password);
    if (!compared) {
      throw "รหัสผ่านไม่ถูกต้อง";
    }
    const tokenData = {
      professor_id: user[0][0].professor_Id,
    };
    const signedToken = signToken(tokenData);
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    res.cookie("profToken", signedToken, cookieOptions);
    return res.status(201).json({ message: "Login Successful" });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export default SignInProf;
