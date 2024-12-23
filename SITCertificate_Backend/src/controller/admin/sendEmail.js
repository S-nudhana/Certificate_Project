import { sendMail } from "../../services/sendMail.js";

const sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;
  try {
    const response = await sendMail({
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default sendEmail;
