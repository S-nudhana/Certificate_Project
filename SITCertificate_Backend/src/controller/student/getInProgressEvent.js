import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const getAllInProgressEvent = async (req, res) => {
  const { token } = req.cookies;
  try {
    const userId = verifyToken(token);
    const student_email = userId.student_email;
    const value = [student_email];
    const eventsQuery = await db
      .promise()
      .query(
        "SELECT event_Id, event_name, event_startDate, event_endDate, event_thumbnail FROM event WHERE event_startDate <= NOW() AND event_endDate >= NOW() AND event_approve = 1 AND event_Id IN (SELECT student_event_eventId FROM student_event AS se, student AS s WHERE s.student_email = ? AND s.student_Id = se.student_event_studentId) ORDER BY event_startDate DESC",
        [value]
      );
    const events = eventsQuery[0];
    return res.json({
      success: true,
      data: {
        events: events,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
export default getAllInProgressEvent;
