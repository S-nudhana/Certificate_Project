import { transporter } from "../user/transporter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../db/connection.js";
dotenv.config();

const sendEmail = async(req, res) => {
    const { id, subject, eventName, commentDetail } = req.body;
    try {
        const { profToken } = req.cookies;
        const Id = jwt.verify(profToken, process.env.JWTSecretKey);
        const profId = parseInt(Id.professor_id);
        const dataQuery = await db
            .promise()
            .query(
                `SELECT admin_email FROM admin WHERE admin_Id IN (SELECT event_adminId from event WHERE event_Id = ?)`, [parseInt(id)]
            );
        const reciever = dataQuery[0][0].admin_email;
        const senderQuery = await db.promise()
            .query(
                `SELECT professor_userName FROM professor WHERE professor_Id = ?`, [profId]
            );
        const sender = senderQuery[0][0].professor_userName;
        const mailOptions = {
            from: `"SITCertificate" <${process.env.EMAIL_USER}>`,
            to: reciever,
            subject: subject,
            text: `อาจารย์ ${sender} ได้เพิ่มความคิดเห็นใหม่ ${commentDetail} ในกิจกรรม ${eventName}`,
            html: `<p>อาจารย์ ${sender} ได้เพิ่มความคิดเห็นใหม่ ${commentDetail} ในกิจกรรม ${eventName}</p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "Failed to send email", error });
            }
            res.status(200).json({ message: "Email sent", info });
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message,
        });
    }
};
export default sendEmail;