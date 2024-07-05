import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "../SITCertificate_Backend/src/db/connection.js";
import adminRouter from "../SITCertificate_Backend/src/router/admin.js";
import profRouter from "../SITCertificate_Backend/src/router/prof.js";
 
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});