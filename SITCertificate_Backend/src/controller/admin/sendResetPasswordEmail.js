import { transporter } from "../user/transporter.js";
import db from "../../db/connection.js";
import { decryptPin } from "../auth/jwt.js";

const sendResetPasswordEmail = async(req, res) => {
    const { email } = req.body;
    const value = [email];
    const querry = await db.promise().query("SELECT admin_forgotpasswordPin FROM admin WHERE admin_email = ?", value);
    const pin = querry[0][0].admin_forgotpasswordPin;
    const decryptedPin = decryptPin(pin);
    const mailOptions = {
        from: `"SITCertificate" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "แจ้งเตือนจาก SIT Certificate",
        text: `รหัสยืนยันการเปลี่ยนรหัสผ่านของคุณคือ ${decryptedPin}`,
        html: `<p>รหัสยืนยันการเปลี่ยนรหัสผ่านของคุณคือ <b>${decryptedPin}</b></p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send email', error });
        }
        res.status(200).json({ message: 'Email sent', info });
    });
};
export default sendResetPasswordEmail;