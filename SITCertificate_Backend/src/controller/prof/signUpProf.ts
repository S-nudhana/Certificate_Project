import { Request, Response } from "express";
import connection from "../../db/connection";
import { hashedPassword } from "../auth/jwt";
import { v4 as uuidv4 } from "uuid";

import type { ProfRegisterRequest } from "../../types/prof";

const CreateProf = async (req: Request, res: Response): Promise<void> => {
  const { username, fullname, email, password }: ProfRegisterRequest = req.body;

  try {
    if (!username || !fullname || !email || !password) {
      res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" })
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@sit.kmutt.ac.th$/;

    if (!email || !emailRegex.test(email)) {
      res.status(400).json({ message: 'Invalid email format' });
      return;
    }
    const [rows] = await connection
      .promise()
      .query("SELECT professor_email FROM professor WHERE professor_email = ?", [email]) as [any[], any];

    if (rows.length > 0) {
      res.status(400).json({
        message: "อีเมลนี้มีผู้ใช้งานแล้ว",
      })
      return;
    }

    const hashed_password = hashedPassword(password);
    const values = [uuidv4(), username, fullname, email, hashed_password];

    await connection.promise().query(
      "INSERT INTO professor (professor_id, professor_username, professor_fullname, professor_email, professor_password) VALUES (?, ?, ?, ?, ?)",
      values
    );
    res.status(201).json({ success: true, message: "สร้างบัญชีผู้ใช้สำเร็จ" })
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" })
    return;
  }
};

export default CreateProf;
