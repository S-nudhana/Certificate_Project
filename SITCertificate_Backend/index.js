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
app.use(express.json());
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

app.use("/admin/", adminRouter);
app.use("/prof/", profRouter);
app.use("/student/", studentRouter);
app.use("/user/", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});