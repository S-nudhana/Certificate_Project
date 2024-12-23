import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
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