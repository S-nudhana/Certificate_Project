import { transporter } from "../../services/transporter.js";

const sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;
  try {
    const mailOptions = {
      from: `"<No Reply> SITCertificate" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Failed to send email", error });
      }
      res.status(200).json({ message: "Email sent", info });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default sendEmail;
