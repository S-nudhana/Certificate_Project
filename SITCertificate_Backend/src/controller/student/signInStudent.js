import db from "../../db/connection.js";
import { compare, signToken, hashedPassword } from "../auth/jwt.js";

const SignInStudent = async(req, res) => {
    try {
        const { email, password } = req.body;
        const value = [email];
        const user = await db
            .promise()
            .query("SELECT student_email, student_password FROM student WHERE student_email = ?", [value]);
        if (user[0].length < 1) {
            throw "ไม่พบบัญชีนี้ในระบบ";
        }
        const compared = compare(password, user[0][0].student_password);
        if (!compared) {
            throw "รหัสผ่านไม่ถูกต้อง";
        }
        const tokenData = {
            student_email: user[0][0].student_email,
        };
        const signedToken = signToken(tokenData);
        const cookieOptions = {
            httpOnly: true,
            secure: true,
        };
        res.cookie("token", signedToken, cookieOptions);
        return res.status(201).json({ message: "Login Successful" });
    } catch (e) {
        return res.status(500).json({ message: e });
    }
};

export default SignInStudent;