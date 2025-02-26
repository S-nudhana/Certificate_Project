import { transporter } from "../config/transporterConfig.js";

export const sendMail = async ({ to, subject, text, html }) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: `"<No Reply> SITCertificate" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject({ message: "Failed to send email", error });
      } else {
        resolve({ message: "Email sent", info });
      }
    });
  });
};
