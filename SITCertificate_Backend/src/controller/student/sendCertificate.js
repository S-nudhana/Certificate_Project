import db from "../../db/connection.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import admin from 'firebase-admin';
import axios from 'axios';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config();

// Use `import` to load the service account key
const serviceAccount = await
import ('../../../sitcertificateFirebase.json', {
    assert: { type: 'json' }
});
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default),
    storageBucket: 'gs://sitcertificate-284c8.appspot.com'
});

const bucket = admin.storage().bucket();

const transporter = nodemailer.createTransport({
    host: 'smtp.sit.kmutt.ac.th',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendCertificate = async(req, res) => {
    const { id, fileUrl } = req.body;
    try {
        const { token } = req.cookies;
        const userId = jwt.verify(token, process.env.JWTSecretKey);
        const studentId = userId.student_email;
        const eventId = parseInt(id);
        const value = [eventId, studentId];
        const dataQuery = await db
            .promise()
            .query(
                `SELECT student_emailToSendCertificate FROM student WHERE student_joinedEventId = ? AND student_email = ?`,
                value
            );
        const email = dataQuery[0][0].student_emailToSendCertificate;
        const eventNameQuery = await db.promise()
            .query(
                `SELECT event_name FROM event WHERE event_Id = ?`, [id]
            );
        const eventName = eventNameQuery[0][0].event_name;
        const response = await axios({
            url: fileUrl,
            method: 'GET',
            responseType: 'arraybuffer',
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "แจ้งเตือนจาก SIT Certificate",
            text: `ใบประกาษณีขบัตรของกิจกรรม ${eventName}`,
            html: `<b>ใบประกาษณีขบัตรของกิจกรรม ${eventName}</b>`,
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