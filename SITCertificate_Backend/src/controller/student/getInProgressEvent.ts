import { Request, Response } from "express";
import db from "../../db/connection";
import dotenv from "dotenv";
import type { Event } from "../../types/student";
import { verifyToken } from "../auth/jwt";
import { JwtPayload } from "jsonwebtoken";

dotenv.config();

const getAllInProgressEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.cookies;
  try {
    const id = verifyToken(token);
    const student_email = (id as JwtPayload).student_email;
    const [rows] = await db
      .promise()
      .query(
        "SELECT event_id, event_name, event_startDate, event_endDate, event_thumbnail FROM event WHERE event_startDate <= NOW() AND event_endDate >= NOW() AND event_approve = 1 AND event_id IN (SELECT student_event_eventId FROM student_event AS se, student AS s WHERE s.student_email = ? AND s.student_Id = se.student_event_studentId) ORDER BY event_startDate DESC",
        [student_email]
      );
    const events = rows as Event[];
    res.json({
      success: true,
      data: {
        events: events,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getAllInProgressEvent;
