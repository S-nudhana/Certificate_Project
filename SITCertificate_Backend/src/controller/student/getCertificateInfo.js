import db from "../../db/connection.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const getCertificateInfo = async (req, res) => {
  const eventId = parseInt(req.query.id);
  try {
    const { token } = req.cookies;
    const userId = jwt.verify(token, process.env.JWTSecretKey);
    const studentId = userId.student_email;
    const value = [eventId, studentId];
    const dataQuery = await db
      .promise()
      .query(
        `SELECT student_nameOnCertificate, student_surnameOnCertificate, student_emailToSendCertificate FROM student WHERE student_joinedEventId = ? AND student_email = ?`,
        value
      );
    const data = dataQuery[0][0];
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
export default getCertificateInfo;
