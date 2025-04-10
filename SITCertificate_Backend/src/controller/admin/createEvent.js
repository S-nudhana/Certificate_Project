import db from "../../db/connection.js";
import { verifyToken } from "../auth/jwt.js";

const createEvent = async (req, res) => {
  const { token } = req.cookies;
  const {
    eventName,
    eventOwner,
    openDate,
    closeDate,
    thumbnail,
    template,
    excel,
    emailTemplate,
    inputSize,
    inputY,
  } = req.body;
  try {
    const id = verifyToken(token);
    const adminId = id.admin_id;
    const value = [
      eventName,
      eventOwner,
      openDate,
      closeDate,
      thumbnail,
      template,
      excel,
      0,
      adminId,
      emailTemplate,
      inputSize,
      inputY,
    ];
    await db
      .promise()
      .query(
        "INSERT INTO `event` (`event_name`, `event_owner`, `event_startDate`, `event_endDate`, `event_thumbnail`, `event_certificate`, `event_excel`, `event_approve`, `event_adminId`, `event_emailTemplate`, `event_certificate_text_size`, `event_certificate_position_y`) VALUES (?)",
        [value]
      );
    
    return res
      .status(201)
      .json({ success: true, message: "สร้างกิจกกรมเสร็จสิ้น" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export default createEvent;
