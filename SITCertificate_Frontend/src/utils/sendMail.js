// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.ethereal.email",
//   port: 465,
//   secure: true,
//   auth: {
//     user: import.meta.env.VITE_REACT_APP_MAIl_USER,
//     pass: import.meta.env.VITE_REACT_APP_MAIL_PASS,
//   },
// });

// export const sendMailToProfessor = async (mailOptions) => {
//   sendMail(transporter, mailOptions)
// }

// export const sendMail = async (transporter, mailOptions) => {
//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Message sent: %s", info.messageId);
//   } catch (error) {
//     console.log(error);
//   }
// };