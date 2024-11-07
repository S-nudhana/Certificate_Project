import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import { corsOptions } from "./src/middleware/cors.config.js";
import { limiter } from "./src/middleware/limiter.js";
import { logger } from "./src/middleware/logger.js";
import db from "../SITCertificate_Backend/src/db/connection.js";

import adminRouter from "./src/router/admin.js";
import profRouter from "./src/router/prof.js";
import studentRouter from "./src/router/student.js";
import userRouter from "./src/router/user.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(helmet());
app.use(cors(corsOptions));
// app.use("/api", limiter);
db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/prof", profRouter);
app.use("/api/student", studentRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
