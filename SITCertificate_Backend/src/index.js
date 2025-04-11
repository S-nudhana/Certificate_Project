import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";

import db from "./db/connection.js";

import { corsOptions } from "./config/corsConfig.js";
import { limiter } from "./middleware/limiter.js";
import { logger } from "./middleware/logger.js";

import adminRouter from "./router/admin.js";
import profRouter from "./router/prof.js";
import studentRouter from "./router/student.js";
import userRouter from "./router/user.js";

import getFile from "./controller/getFile.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(logger);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.connect((error) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Connected to the database");
  }
});

app.use("/file", getFile);
app.use("/api", limiter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/prof", profRouter);
app.use("/api/student", studentRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
