import { Request, Response } from "express";
import db from "../../db/connection";
import { compare, signToken } from "../auth/jwt";
import { StudentLoginRequest } from "../../types/student";

interface StudentTokenData {
  student_email: string;
  role: string;
  id: string;
}

const SignInStudent = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: StudentLoginRequest = req.body;

  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT student_email, student_password, student_Id FROM student WHERE student_email = ?",
        [email]
      );

    const user = rows as {
      student_email: string;
      student_password: string;
      student_Id: string;
    }[];

    if (user.length < 1) {
      res.status(400).json({ message: "ไม่พบบัญชีนี้ในระบบ" });
      return;
    }

    const passwordMatch = compare(password, user[0].student_password);
    if (!passwordMatch) {
      res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
      return;
    }

    const tokenData: StudentTokenData = {
      student_email: user[0].student_email,
      role: "student",
      id: user[0].student_Id,
    };

    const signedToken = signToken(JSON.stringify(tokenData));

    const cookieOptions = {
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000,
      expires: new Date(Date.now() + 15 * 60 * 1000),
      secure: process.env.NODE_ENV === "production",
    };

    res.cookie("token", signedToken, cookieOptions);
    res.status(201).json({ success: true, message: "เข้าสู่ระบบสำเร็จ" });
    return;
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export default SignInStudent;
