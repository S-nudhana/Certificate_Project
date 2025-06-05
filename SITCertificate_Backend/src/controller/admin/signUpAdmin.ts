import { Request, Response } from "express";
import db from "../../db/connection";
import { hashedPassword } from "../auth/jwt";
import { v4 as uuidv4 } from "uuid";

import type { AdminRegisterRequest } from "../../types/admin";

const signUpAdmin = async (req: Request, res: Response): Promise<void> => {
  const { username, fullname, email, password }: AdminRegisterRequest = req.body;
  try {
    if (!username || !fullname || !email || !password) {
      res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
      return;
    }

    const [users] = await db
      .promise()
      .query("SELECT admin_email FROM admin WHERE admin_email = ?", [email]);

    const userRows = users as { admin_email: string }[];

    if (userRows.length > 0) {
      res.status(400).json({
        success: false,
        message: "อีเมลนี้มีผู้ใช้งานแล้ว",
      });
      return;
    }

    const hashed_password = hashedPassword(password);
    const values = [uuidv4(), username, fullname, email, hashed_password];
    await db
      .promise()
      .query(
        "INSERT INTO admin (admin_id, admin_username, admin_fullname, admin_email, admin_password) VALUES (?, ?, ?, ?, ?)",
        values
      );

    res.status(201).json({ success: true, message: "สร้างบัญชีผู้ใช้สำเร็จ" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default signUpAdmin;
