import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js";

dotenv.config();

const updateGenerateCertificate = async (req, res) => {
  const eventId = parseInt(req.params.id);
  const { token } = req.cookies;
  try {
    const userId = verifyToken(token);
    const studentEmail = userId.student_email;
    await db
      .promise()
      .query(
        "UPDATE student SET student_eventGenerated = ? WHERE student_joinedEventId = ? AND student_email = ?",
        [1, eventId, studentEmail]
      );
    return res.status(200).json({
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
