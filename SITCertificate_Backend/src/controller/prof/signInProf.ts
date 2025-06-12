import { Request, Response } from "express";
import db from "../../db/connection";
import { compare, signToken } from "../auth/jwt";

import type { ProfLoginRequest } from "../../types/prof";

const SignInProf = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: ProfLoginRequest = req.body;

  try {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@sit.kmutt.ac.th$/;

    if (!email || !emailRegex.test(email)) {
      res.status(400).json({ message: 'Invalid email format' });
      return;
    }
    const [rows] = await db.promise().query("SELECT professor_id, professor_password FROM professor WHERE professor_email = ?",[email]) as [any[], any];
    const user = rows as { professor_id: string; professor_password: string }[];
    if (user.length !== 1) {
      res.status(500).json({ message: "ไม่พบบัญชีนี้ในระบบ" })
      return;
    }

    const isPasswordCorrect = compare(password, user[0].professor_password);
    if (!isPasswordCorrect) {
      res.status(400).json({ success: false, message: "รหัสผ่านไม่ถูกต้อง" });
      return;
    }

    const tokenData = {
      professor_id: rows[0].professor_id,
      role: "professor",
    };

    const signedToken = signToken(JSON.stringify(tokenData));

    const cookieOptions = {
      httpOnly: true,
      maxAge: 3 * 60 * 60 * 1000,
      expires: new Date(Date.now() + 15 * 60 * 1000),
      secure: process.env.NODE_ENV === "production" ? true : false,
    };

    res.cookie("token", signedToken, cookieOptions);
    res.status(201).json({ success: true, message: "เข้าสู่ระบบสำเร็จ" })
    return;
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal server error" })
    return;
  }
};

export default SignInProf;
