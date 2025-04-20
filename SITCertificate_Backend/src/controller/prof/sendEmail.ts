import { Request, Response } from "express";
import dotenv from "dotenv";
import db from "../../db/connection";
import { verifyToken } from "../auth/jwt";
import { sendMail } from "../../services/mail";

dotenv.config();

const sendEmail = async (req: Request, res: Response): Promise<void> => {
  const { id, subject, eventName, commentDetail } = req.body;
  const { token } = req.cookies;

  try {
    const Id = verifyToken(token);
    const profId =
      typeof Id !== "string" && "professor_id" in Id
        ? parseInt(Id.professor_id)
        : null;

    if (profId === null) {
      res
        .status(400)
        .json({ success: false, message: "Invalid token payload" });
      return;
    }

    const [adminRows] = (await db
      .promise()
      .query(
        `SELECT admin_email FROM admin WHERE admin_Id IN (SELECT event_adminId from event WHERE event_Id = ?)`,
        [parseInt(id)]
      )) as [Array<{ admin_email: string }>, any];

    if (adminRows.length === 0) {
      res.status(404).json({ success: false, message: "ไม่พบอีเมลของแอดมิน" });
      return;
    }

    const receiver = adminRows[0].admin_email;

    const [profRows] = (await db
      .promise()
      .query(
        `SELECT professor_userName FROM professor WHERE professor_Id = ?`,
        [profId]
      )) as [Array<{ professor_userName: string }>, any];

    if (profRows.length === 0) {
      res.status(404).json({ success: false, message: "ไม่พบบัญชีอาจารย์" });
      return;
    }

    const sender = profRows[0].professor_userName;

    try {
      await sendMail({
        to: receiver,
        subject,
        text: `อาจารย์ ${sender} ได้เพิ่มความคิดเห็นใหม่ ${commentDetail} ในกิจกรรม ${eventName}`,
        html: `<p>อาจารย์ ${sender} ได้เพิ่มความคิดเห็นใหม่ ${commentDetail} ในกิจกรรม ${eventName}</p>`,
      });
      res.status(200).json({ success: true, message: "ส่งอีเมลสำเร็จ" });
      return;
    } catch (mailError) {
      console.error("Error: ", mailError);
      res.status(500).json({ success: false, message: "ไม่สามารถส่งอีเมลยืนยันได้" });
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    })
    return;
  }
};

export default sendEmail;
