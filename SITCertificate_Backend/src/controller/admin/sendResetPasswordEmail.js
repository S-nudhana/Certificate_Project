import { transporter } from "../user/transporter.js";
import db from "../../db/connection.js";
import { decryptPin } from "../auth/crypto.js";

const sendResetPasswordEmail = async(req, res) => {
    const { email } = req.body;
    try {
        const value = [email];
        const querry = await db.promise().query("SELECT admin_forgotpasswordPin, admin_iv FROM admin WHERE admin_email = ?", value);
        const adminResetPin = querry[0][0].admin_forgotpasswordPin;
        const iv = querry[0][0].admin_iv;
        const decryptedPin = decryptPin(adminResetPin, iv); 
        const mailOptions = {
            from: `"<No Reply> SITCertificate" <${process.env.EMAIL_USER}>`,
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
    } catch (error) {
        console.error("sendResetPasswordEmail error", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
};
export default sendResetPasswordEmail;