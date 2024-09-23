import { transporter } from "../user/transporter.js";
import db from "../../db/connection.js";
import { hashedPassword } from "../auth/jwt.js";
import { decryptPin } from "../auth/crypto.js";

const resetPassword = async(req, res) => {
    const { email, pin, password } = req.body;
    const value = [email];
    const querry = await db
        .promise()
        .query(
            "SELECT professor_forgotpasswordPin, professor_iv FROM professor WHERE professor_email = ?",
            value
        );
    const professorResetPin = querry[0][0].professor_forgotpasswordPin;
    const iv = querry[0][0].professor_iv;
    const decryptedPin = decryptPin(professorResetPin, iv);
    if (decryptedPin === parseInt(pin, 10)) {
        const hashed_password = hashedPassword(password);
        const value2 = [hashed_password, email];
        await db
            .promise()
            .query(
                "UPDATE professor SET professor_password = ? WHERE professor_email = ?",
                value2
            );
        const mailOptions = {
            from: `"SITCertificate" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "แจ้งเตือนจาก SIT Certificate",
            text: `รหัสผ่านของคุณถูกเปลี่ยนแล้ว`,
            html: `<p>รหัสผ่านของคุณถูกเปลี่ยนแล้ว</p>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "Failed to send email", error });
            }
            res.status(200).json({ message: "Email sent", info });
        });
    } else {
        return res.status(400).json({ message: "Invalid pin" });
    }
};
export default resetPassword;