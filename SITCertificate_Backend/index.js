import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "../SITCertificate_Backend/src/db/connection.js";
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });