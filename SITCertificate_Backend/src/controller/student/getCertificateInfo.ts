import { Request, Response } from "express";
import db from "../../db/connection";
import dotenv from "dotenv";
import { verifyToken } from "../auth/jwt";

dotenv.config();

interface Certificate {
  student_nameOnCertificate: string;
  student_surnameOnCertificate: string;
  student_emailTostudent_sendCertificate: string;
}

const getCertificateInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const eventId = req.query.id;
  const { token } = req.cookies;

  try {
    const userId = verifyToken(token);
    const studentEmail = userId.student_email;

    const value = [eventId, studentEmail];

    const [rows] = await db.promise().query(
      `SELECT student_nameOnCertificate, student_surnameOnCertificate, student_emailTostudent_sendCertificate 
         FROM student 
         WHERE student_joinedEventId = ? AND student_email = ?`,
      value
    );

    const certificate = rows as Certificate[];

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
