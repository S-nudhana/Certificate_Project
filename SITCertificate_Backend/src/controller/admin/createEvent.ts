import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import db from "../../db/connection.js";
import { verifyToken } from "../auth/jwt.js";

const createEvent = async (req: Request, res: Response): Promise<void> => {
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
    if (typeof id !== "object" || !("admin_id" in id)) {
      throw new Error("Invalid token payload");
    }
    const adminId = (id as JwtPayload).admin_id;
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
    res.status(201).json({ success: true, message: "สร้างกิจกรรมเสร็จสิ้น" });
    return;
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
    return;
  }
};

export default createEvent;
