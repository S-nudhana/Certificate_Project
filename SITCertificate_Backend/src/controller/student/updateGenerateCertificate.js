import db from "../../db/connection.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const updateGenerateCertificate = async (req, res) => {
  const eventId = parseInt(req.query.id);
  try {
    const { token } = req.cookies;
    const userId = jwt.verify(token, process.env.JWTSecretKey);
    const studentId = userId.student_email;
    await db
      .promise()
      .query(
        "UPDATE student SET student_eventGenerated = ? WHERE student_joinedEventId = ? AND student_email = ?",
        [1, eventId, studentId]
      );
    return res.json({
      success: true,
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

export default updateGenerateCertificate;
