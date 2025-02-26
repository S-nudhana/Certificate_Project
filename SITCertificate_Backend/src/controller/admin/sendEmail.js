import { sendMail } from "../../services/mail.js";

const sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;
  try {
    await sendMail({
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    return res
      .status(200)
      .json({ success: true, message: "อีเมลถูกส่งเรียบร้อยแล้ว" });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message: error });
  }
};
export default sendEmail;
