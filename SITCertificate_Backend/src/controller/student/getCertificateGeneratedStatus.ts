import { Request, Response } from "express";
import db from "../../db/connection";
import dotenv from "dotenv";
import { verifyToken } from "../auth/jwt";
import { JwtPayload } from "jsonwebtoken";

import type { StudentEventCertificateGenerate } from "../../types/student";

dotenv.config();

const getCertificateGeneratedStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const eventId: string = req.params.id;
  const { token } = req.cookies;

  try {
    const id = verifyToken(token);
    const studentEmail = (id as JwtPayload).student_email;
    const value = [eventId, studentEmail];

    const [rows] = await db.promise().query(
      `SELECT se.student_event_eventCertificateGenerated 
         FROM student_event AS se, student AS s 
         WHERE s.student_Id = se.student_event_studentId 
         AND se.student_event_eventId = ? 
         AND s.student_email = ?`,
      value
    );

    const status = (rows as StudentEventCertificateGenerate[])[0]?.student_event_eventCertificateGenerated;

    if (status === 1) {
      res.json({
        success: true,
        data: {
          status: false,
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        status: true,
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

export default getCertificateGeneratedStatus;
