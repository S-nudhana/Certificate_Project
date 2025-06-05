import { Request, Response } from "express";
import db from "../../db/connection";
import dotenv from "dotenv";
import { verifyToken } from "../auth/jwt";
import type { CertificateInfo } from "../../types/student";
import { JwtPayload } from "jsonwebtoken";

dotenv.config();

const getCertificateInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const eventId = req.query.id;
  const { token } = req.cookies;

  try {
    const id = verifyToken(token);
    const studentEmail = (id as JwtPayload).student_email;

    const value = [eventId, studentEmail];

    const [rows] = await db.promise().query(
      `SELECT student_nameOnCertificate, student_surnameOnCertificate, student_emailTostudent_sendCertificate 
         FROM student 
         WHERE student_joinedEventId = ? AND student_email = ?`,
      value
    );

    const certificate = rows as CertificateInfo[];

    res.status(200).json({
      success: true,
      data: {
        certificate: certificate,
      },
    });
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

export default getCertificateInfo;
