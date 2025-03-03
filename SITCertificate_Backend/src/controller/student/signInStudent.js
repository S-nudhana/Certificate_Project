import db from "../../db/connection.js";
import { compare, signToken } from "../auth/jwt.js";

const SignInStudent = async(req, res) => {
    const { email, password } = req.body;
    try {
        const value = [email];
        const user = await db
            .promise()
            .query("SELECT student_email, student_password, student_Id FROM student WHERE student_email = ?", [value]);
        if (user[0].length < 1) {
            throw "ไม่พบบัญชีนี้ในระบบ";
        }
        const compared = compare(password, user[0][0].student_password);
        if (!compared) {
            throw "รหัสผ่านไม่ถูกต้อง";
        }
        const tokenData = {
            student_email: user[0][0].student_email,
            role: "student",
            id: user[0][0].student_Id
        };
        const signedToken = signToken(tokenData);
        const cookieOptions = {
            httpOnly: true,
            maxAge: 3 * 60 * 60 * 1000,
            expires: new Date(Date.now() + 15 * 60 * 1000),
            // secure: true,
        };
        res.cookie("token", signedToken, cookieOptions);
        return res.status(201).json({ success: true, message: "เข้าสู่ระบบสำเร็จ" });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default SignInStudent;