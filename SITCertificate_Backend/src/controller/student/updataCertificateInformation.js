import db from "../../db/connection.js";
import dotenv from "dotenv";

import { verifyToken } from "../auth/jwt.js"; 

dotenv.config();

const updataCertificateInformation = async (req, res) => {
  const {eventId, name, surname, email, modifiedPdf} = req.body;
  const { token } = req.cookies;
  try {
    const userId = verifyToken(token);
    const studentId = userId.student_email;
    await db
      .promise()
      .query(
        "UPDATE student SET student_nameOnCertificate = ?, student_surnameOnCertificate = ?, student_emailToSendCertificate = ?, student_GenerateCertificate = ? WHERE student_joinedEventId = ? AND student_email = ?",
        [name, surname, email, modifiedPdf, parseInt(eventId), studentId]
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

export default updataCertificateInformation;
