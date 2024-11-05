import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const getAllInProgressEvent = async (req, res) => {
  try {
    const { token } = req.cookies;
    const userId = verifyToken(token);
    const student_email = userId.student_email;
    const value = [student_email];
    const dataQuery = await db
      .promise()
      .query(
        "SELECT event_Id, event_name, event_startDate, event_endDate, event_thumbnail FROM event WHERE event_startDate <= NOW() AND event_endDate >= NOW() AND event_approve = 1 AND event_Id IN (SELECT student_joinedEventId FROM student WHERE student_email = ?) ORDER BY event_startDate DESC",
        [value]
      );
    const data = dataQuery[0];
    return res.json({
      success: true,
      data: data,
      error: null,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      error: error.message,
    });
  }
};
export default getAllInProgressEvent;
