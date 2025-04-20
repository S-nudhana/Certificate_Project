import { Request, Response } from "express";
import { sendMail } from "../../services/mail";

const sendEmail = async (req: Request, res: Response): Promise<void> => {
  const { to, subject, text, html } = req.body;

  try {
    await sendMail({
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    res
      .status(200)
      .json({ success: true, message: "อีเมลถูกส่งเรียบร้อยแล้ว" });
    return;
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal server error" })
    return;
  }
};

export default sendEmail;
