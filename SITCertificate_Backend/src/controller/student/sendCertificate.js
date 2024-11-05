import db from "../../db/connection.js";
import dotenv from "dotenv";
import admin from 'firebase-admin';
import axios from 'axios';

import { verifyToken } from "../auth/jwt.js";

import { transporter } from "../user/transporter.js";

dotenv.config();

const serviceAccount = await
import ('../../../sitcertificateFirebase.json', {
    assert: { type: 'json' }
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default),
    storageBucket: 'gs://sitcertificate-284c8.appspot.com'
});

const bucket = admin.storage().bucket();

const sendCertificate = async(req, res) => {
    const { id, fileUrl } = req.body;
    try {
        const { token } = req.cookies;
        const Id = verifyToken(token);
        const studentEmail = Id.student_email;
        const eventId = parseInt(id);
        const value = [eventId, studentEmail];
        const studentQuery = await db
            .promise()
            .query(
                `SELECT student_emailToSendCertificate FROM student WHERE student_joinedEventId = ? AND student_email = ?`,
                value
            );
        const email = studentQuery[0][0].student_emailToSendCertificate;
        const eventQuery = await db.promise()
            .query(
                `SELECT event_name, event_emailTemplate FROM event WHERE event_Id = ?`, [eventId]
            );
        const eventName = eventQuery[0][0].event_name;
        const emailTemplate = eventQuery[0][0].event_emailTemplate;
        const response = await axios({
            url: fileUrl,
            method: 'GET',
            responseType: 'arraybuffer',
        });
        const mailOptions = {
            from: `"<No Reply> SITCertificate" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "แจ้งเตือนจาก SIT Certificate",
            text: `${emailTemplate}`,
            attachments: [{
                filename: `${eventName}.pdf`,
                content: response.data,
            }]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Failed to send email', error });
            }
            res.status(200).json({ message: 'Email sent', info });
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

export default sendCertificate;