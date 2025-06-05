import { Request, Response } from "express";
import db from "../../db/connection";
import { compare, signToken } from "../auth/jwt";

import type { ProfLoginRequest } from "../../types/prof";

const SignInProf = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: ProfLoginRequest = req.body;

  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT professor_Id, professor_password FROM professor WHERE professor_email = ?",
        [email]
      ) as [any[], any];

    if (rows.length !== 1) {
      res.status(500).json({ message: "ไม่พบบัญชีนี้ในระบบ" })
      return; 
    }

    const compared = compare(password, rows[0].professor_password);
    if (!compared) {
      res.status(500).json({ message: "รหัสผ่านไม่ถูกต้อง" })
      return; 
    }

    const tokenData = {
      professor_id: rows[0].professor_Id,
      role: "professor",
    };

    const signedToken = signToken(JSON.stringify(tokenData));

    const cookieOptions: { httpOnly: boolean; maxAge: number; expires: Date; secure: boolean } = {
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
