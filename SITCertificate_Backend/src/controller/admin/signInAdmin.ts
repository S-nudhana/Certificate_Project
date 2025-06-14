import { Request, Response } from "express";
import db from "../../db/connection";
import { compare, signToken } from "../auth/jwt";

import type { AdminLoginRequest } from "../../types/admin";

const SignInAdmin = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: AdminLoginRequest = req.body;

  try {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@sit.kmutt.ac.th$/;

    if (!email || !emailRegex.test(email)) {
      res.status(400).json({ message: 'Invalid email format' });
      return;
    }
    const [rows] = await db.promise().query("SELECT admin_id, admin_password FROM admin WHERE admin_email = ?", [email]);
    const user = rows as { admin_id: string; admin_password: string }[];
    if (user.length !== 1) {
      res.status(400).json({ success: false, message: "ไม่พบบัญชีนี้ในระบบ" });
      return;
    }
    const isPasswordCorrect = compare(password, user[0].admin_password);
    if (!isPasswordCorrect) {
      res.status(400).json({ success: false, message: "รหัสผ่านไม่ถูกต้อง" });
      return;
    }
    const tokenData = {
      admin_id: user[0].admin_id,
      role: "admin",
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
  }
};

export default SignInAdmin;
