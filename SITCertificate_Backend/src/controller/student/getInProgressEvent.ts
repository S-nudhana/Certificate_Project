import { Request, Response } from "express";
import db from "../../db/connection";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt";

dotenv.config();

interface Event {
  event_Id: number;
  event_name: string;
  event_startDate: string;
  event_endDate: string;
  event_thumbnail: string;
}

const getAllInProgressEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.cookies;
  try {
    const userId = verifyToken(token);
    if (typeof userId !== "object" || !("student_email" in userId)) {
      throw new Error("Invalid token payload");
    }
    const student_email = userId.student_email;
    const [rows] = await db
      .promise()
      .query(
        "SELECT event_Id, event_name, event_startDate, event_endDate, event_thumbnail FROM event WHERE event_startDate <= NOW() AND event_endDate >= NOW() AND event_approve = 1 AND event_Id IN (SELECT student_event_eventId FROM student_event AS se, student AS s WHERE s.student_email = ? AND s.student_Id = se.student_event_studentId) ORDER BY event_startDate DESC",
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
