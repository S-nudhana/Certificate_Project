import nodemailer from 'nodemailer';

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


const sendEmail = async(req, res) => {
    const { to, subject, text, html } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send email', error });
        }
        res.status(200).json({ message: 'Email sent', info });
    });
};
export default sendEmail;