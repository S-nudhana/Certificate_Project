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

app.use(cors(corsOptions));
app.use('/uploads', (req, res, next) => {
    const origin = req.get('origin');
    const path = req.path;
    if (path.includes('upload_template')) {
        if (!origin) {
            return res.status(403).json({ message: "This file cannot be accessed without a valid origin." });
        }
    }
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  }, express.static("uploads"));

app.use(logger);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
// app.use("/api", limiter);
db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/prof", profRouter);
app.use("/api/student", studentRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
