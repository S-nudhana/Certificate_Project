import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "../SITCertificate_Backend/src/db/connection.js";
import adminRouter from "./src/router/admin.js";
import profRouter from "./src/router/prof.js";
import studentRouter from "./src/router/student.js";
import userRouter from "./src/router/user.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cookieParser());
app.use(express.json());
app.use("/admin/", adminRouter);
app.use("/prof/", profRouter);
app.use("/student/", studentRouter);
app.use("/user/", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const authMiddleware = (req, res, next) => {
//   const token = req.cookies.token;
//   const profToken = req.cookies.profToken;
//   const adminToken = req.cookies.adminToken;
//   console.log(token, profToken, adminToken);

//   const professorPath = process.env.VITE_PROFESSOR_PATH;
//   const professorLoginPath = process.env.VITE_PROFESSOR_PATH_LOGIN;
//   const adminPath = process.env.VITE_ADMIN_PATH;
//   const adminLoginPath = process.env.VITE_ADMIN_PATH_LOGIN;
//   console.log(!jwt.verify(adminToken, process.env.JWTSecretKey))
//   try {
//     if (req.path.startsWith(professorPath)) {
//       if (!profToken || !jwt.verify(profToken, process.env.JWTSecretKey)) {
//         return res.redirect(professorLoginPath);
//       }
//     } else if (req.path.startsWith(adminPath)) {
//       if (!adminToken || !jwt.verify(adminToken, process.env.JWTSecretKey)) {
//         return res.redirect(adminLoginPath);
//       }
//     } else {
//       if (!token || !jwt.verify(token, process.env.JWTSecretKey)) {
//         return res.redirect("/login");
//       }
//     }
//   } catch (err) {
//     if (req.path.startsWith(professorPath)) {
//       return res.redirect(professorLoginPath);
//     } else if (req.path.startsWith(adminPath)) {
//       return res.redirect(adminLoginPath);
//     } else {
//       return res.redirect("/login");
//     }
//   }
//   next();
// };
