import db from "../../db/connection.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const getAllInProgressEvent = async (req, res) => {
  try {
    const { token } = req.cookies;
    const userId = jwt.verify(token, process.env.JWTSecretKey);
    const studentId = userId.student_email;
    const value = [studentId];
    const dataQuery = await db
      .promise()
      .query(
        "SELECT * FROM event WHERE event_endDate > NOW() AND event_approve = 1 AND event_Id IN (SELECT student_joinedEventId FROM student WHERE student_email = ?) ORDER BY event_startDate DESC",
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
