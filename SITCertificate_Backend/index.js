import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";

import db from "../SITCertificate_Backend/src/db/connection.js";

import { corsOptions } from "./src/config/cors.config.js";
import { limiter } from "./src/middleware/limiter.js";
import { logger } from "./src/middleware/logger.js";

import adminRouter from "./src/router/admin.js";
import profRouter from "./src/router/prof.js";
import studentRouter from "./src/router/student.js";
import userRouter from "./src/router/user.js";

import getFile from "./src/controller/getFile.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(logger);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

app.use('/file/', getFile);
app.use("/api/user", userRouter);
app.use("/api", limiter);
app.use("/api/admin", adminRouter);
app.use("/api/prof", profRouter);
app.use("/api/student", studentRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
